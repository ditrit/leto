<template>
	<div class="bg-white">
		<ProductHeader>
			<template v-slot:productHeaderContent>
				<section class="productDetails_navbar">
					<div class="productDetails_name">
						<span class="text-bold">
							<q-icon name="apps" size="20px" />
							Product:
						</span>
						<span class="q-ml-sm">
							{{
								currentProductContent
									? currentProductContent[0].name
									: "Loading..."
							}}
						</span>
					</div>
					<div class="productDetails_toggle">
						<q-btn-toggle
							class="modelization_toggle q-ml-lg"
							no-caps
							rounded
							elevated
							toggle-color="primary"
							color="white"
							text-color="primary"
							v-model="modelValue"
							size="10px"
							:options="[
								{ label: 'Model 3D', value: isModelMode },
								{ label: 'Text', value: isSourceMode },
							]"
						/>
					</div>
				</section>
			</template>
		</ProductHeader>
		<q-layout container style="height: 100vh" view="lHh lpR lFf">
			<AjaxBar />

			<!-- Left Drawer-->
			<SideBar side="left" v-if="modelValue === isModelMode">
				<template v-slot:drawerContent>
					<q-scroll-area class="fit">
						<PaletteMenu id="paletteMenu" :data="paletteData"></PaletteMenu>
					</q-scroll-area>
				</template>
			</SideBar>

			<!-- Rigth Drawer-->
			<SideBar side="right" class="" v-if="modelValue === isModelMode">
				<template v-slot:drawerContent>
					<h6 class="q-pl-md q-pt-md q-ma-none text-grey-8">Object Details</h6>
					<div id="detailsContainer">
						<ConfigPannel></ConfigPannel>
					</div>
				</template>
			</SideBar>

			<q-page-container>
				<q-page :style-fn="pageSizeTweak">
					<Modelization
						v-if="modelValue === isModelMode"
						@getTreeObjects="tree"
					/>

					<div
						@change="consoleClick"
						v-show="modelValue === isSourceMode"
						class="monaco"
						ref="monacoContainer"
						style="text-align: left"
					></div>
				</q-page>
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import * as monaco from "monaco-editor";
import { mapActions, mapGetters } from "vuex";
import { hclTokensProvider } from "src/components/Monaco/hclTokensProvider";
import { analyse_resources } from "hcl/src/parser/compiler/schema_parser.js";
import { calculAttributesObjects } from "src/components/Monaco/svg_maths.js";
import plugins from "src/assets/plugins/terraform/plugins";
import {
	toString,
	toStringResource,
} from "src/components/Monaco/toStringFunctions";
import AjaxBar from "components/UI/Progress/AjaxBar";
import SideBar from "components/UI/Drawers/SideBar.vue";
import PaletteMenu from "components/PaletteMenu";
import { pageSizeTweak } from "src/common/index";
import Modelization from "components/2DModel/Modelization.vue";
import useProductDetails from "src/composables/Products/useProductDetails";
import useDomainData from "src/composables/WorkSpace/useDomainData";
import ConfigPannel from "src/components/ConfigPannel.vue";
import awsMetadatas from "src/assets/plugins/terraform/internal/aws/metadatas.json";
import sgCloudPlatformMetadatas from "src/assets/plugins/terraform/sg/cloudplatform/metadatas.json";
import ProductHeader from "src/components/UI/Headers/ProductHeader.vue";

export default defineComponent({
	name: "PageDomainChild",
	components: {
		Modelization,
		AjaxBar,
		PaletteMenu,
		ConfigPannel,
		SideBar,
		ProductHeader,
	},
	data() {
		return {
			iactorDatas: {},
			metadatas: {},
			valueEditor: null,
			defaultValue:
				'provider "aws" {\n access_key="ABCD1234J54PXLDF4IC4WMVA"\n secret_key="28prpojfngldfgPcgiv79Q/J+8o7ksdfsTjmmE2QQBRa"\n region="eu-west-3"\n}\n ',
		};
	},
	created() {
		this.worker = new Worker(
			new URL("src/components/Monaco/iactor.js", import.meta.url)
		);
		this.worker.onmessage = function (event) {
			this.iactorDatas = event.data;
			const provider = {
				provider: this.iactorDatas.provider,
			};
			window.localStorage.setItem("monacoSource", JSON.stringify(provider));
		};
		this.worker.addEventListener("message", (event) => {
			this.getSource();
			this.getMetaDatas();
			this.metadatas = this.allMetadatas;
			const data = event.data;
			data.provider[0].orderResources = this.metadatas.provider.orderResources
				? this.metadatas.provider.orderResources
				: [];
			analyse_resources(data.resources, this.metadatas.provider.resources);
			data.resources = calculAttributesObjects(data);
			window.localStorage.setItem("monacoSource", JSON.stringify(data));
			this.getSource();
		});
	},
	mounted() {
		monaco.languages.register({ id: "hcl" });
		monaco.languages.setTokensProvider("hcl", hclTokensProvider.prototype);
		let string = "BF2937";
		let identifier = "131DB4";
		let symbolsFg = "000000";
		let object = "4FA786";
		let errorFg = "ff0000";
		let comment = "07812C";
		let boolean = "105FEE";
		this.valueEditor = "";
		monaco.editor.defineTheme("terraformTheme", {
			base: "vs",
			inherit: false,
			rules: [
				{ token: "output.hcl", foreground: object },
				{ token: "variable.hcl", foreground: object },
				{ token: "module.hcl", foreground: object },
				{ token: "terraform.hcl", foreground: object },
				{ token: "provider.hcl", foreground: object },
				{ token: "resource.hcl", foreground: object },
				{ token: "string.hcl", foreground: string },
				{ token: "type.hcl", foreground: symbolsFg },
				{ token: "boolean.hcl", foreground: boolean, fontStyle: "bold" },
				{ token: "booleanop.hcl", foreground: symbolsFg },
				{ token: "index.hcl", foreground: symbolsFg },
				{ token: "identifier.hcl", foreground: identifier },
				{ token: "number.hcl", foreground: symbolsFg },
				{ token: "comment.hcl", foreground: comment, fontStyle: "bold" },
				{ token: "line_comment.hcl", foreground: comment, fontStyle: "bold" },
				{ token: "has_comment.hcl", foreground: comment, fontStyle: "bold" },
				{ token: "error.hcl", foreground: errorFg },
			],
			colors: {
				"editor.foreground": "#000000",
			},
		});
		let editor = monaco.editor.create(this.$refs.monacoContainer, {
			language: "hcl",
			theme: "terraformTheme",
			automaticLayout: true,
		});
		this.monacoEditor = editor;
		this.monacoEditor.getModel().setValue(this.defaultValue);
		this.monacoEditor.getModel().onDidChangeContent((_event) => {
			this.onChange(editor.getValue());
			this.consoleClick();
		});
	},
	computed: {
		...mapGetters({
			allMetadatas: "appMonaco/allMetadatas",
			allMonacoSource: "appMonaco/allMonacoSource",
		}),
	},
	methods: {
		...mapActions({
			setResources: "appMonaco/setResources",
			getMonacoSource: "appMonaco/getMonacoSource",
			getMetaSource: "appMonaco/getMetadatas",
		}),
		async getMetaDatas() {
			const provider = JSON.parse(window.localStorage.getItem("monacoSource"))
				.provider[0].name;
			const plugin = plugins[provider];
			const meta = require(`src/assets/plugins/terraform/${plugin}/metadatas.json`);
			await this.getMetaSource(meta);
		},
		tree(e) {
			this.objectsTree = e;
		},
		getSource() {
			return this.getMonacoSource();
		},
		consoleClick() {
			this.worker.postMessage(this.valueEditor);
			this.getSource();
		},
		getGraph() {
			const datas = JSON.parse(window.localStorage.getItem("monacoSource"));
			const str = this.graphToString(datas);
			const models = monaco.editor.getModels();
			const editor = models[models.length - 1];
			editor.setValue(str);
			this.valueEditor = str;
		},
		graphToString(datas) {
			let str = "";
			str += this.resourceToString(datas["resources"]);
			datas["provider"].forEach((provider) => {
				str += toString(provider, "provider") + "\n";
			});
			datas["variables"].forEach((variable) => {
				str += toString(variable, "variable") + "\n";
			});
			datas["datas"].forEach((data) => {
				str += toString(data, "data") + "\n";
			});
			datas["outputs"].forEach((output) => {
				str += toString(output, "output") + "\n";
			});
			return str;
		},
		resourceToString(resources, containers) {
			let str = "";

			resources.forEach((resource) => {
				str += toStringResource(resource, "resource", containers) + "\n";
				if (resource.contains.length > 0) {
					if (!containers) {
						let container = [resource];
						str += this.resourceToString(resource.contains, container);
					} else {
						containers.push(resource);
						str += this.resourceToString(resource.contains, containers);
					}
				}
			});
			return str;
		},
		onChange(value) {
			this.valueEditor = value;
		},
	},
	watch: {
		modelValue(_oldModel, currentModel) {
			if (currentModel === "Model") {
				window.localStorage.setItem(
					"monacoSource",
					JSON.stringify(this.objectsTree.contains)
				);
				this.setResources();
				this.consoleClick();
				this.getGraph();
			}
		},
	},
	props: ["id"],
	setup(props) {
		const isModelMode = ref("Model");
		const isSourceMode = ref("Source");
		const modelValue = ref("Source");
		const drawer = ref(false);
		const oepnDialog = ref(false);
		const filterRef = ref("");
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const selected = ref("DDS");
		const isMounted = ref(false);
		const svgs = ref({});

		let { store, router, $q, openProject, currentProductContent } =
			useProductDetails();
		openProject(props.id);
		let {
			domainTags,
			globalTagsTreeList,
			getTagsTree,
			OnDelete,
			editMode,
			confirm,
			OnEdit,
			domainID,
		} = useDomainData(props);

		const paletteData = [
			{
				name: "AWS",
				icon: "explore",
				data: [],
			},
			{
				name: "Cloudplatform",
				icon: "explore",
				data: [],
			},
		];

		const getSVGS = async () => {
			await store.dispatch("appSVGs/loadPath");
			svgs.value = await store.getters["appSVGs/allSvgs"];
			return svgs.value;
		};

		onMounted(async () => {
			await getSVGS();

			awsMetadatas.provider.resources.forEach((element) => {
				paletteData[0].data.push({
					name: element.resourceType,
					imageUrl: `logos/${element.icon}`,
					description: "Description",
				});
			});
			sgCloudPlatformMetadatas.provider.resources.forEach((element) => {
				paletteData[1].data.push({
					name: element.resourceType,
					imageUrl: `logos/${element.icon}`,
					description: "Description",
				});
			});
			isMounted.value = true;
		});

		return {
			store,
			router,
			drawer,
			isModelMode,
			isSourceMode,
			modelValue,
			oepnDialog,
			filterRef,
			filterTag,
			filterTagRef,
			selected,
			$q,
			paletteData,
			resetFilterTag() {
				filterTag.value = "";
				filterTagRef.value.focus();
			},
			pageSizeTweak,
			domainTags,
			globalTagsTreeList,
			getTagsTree,
			OnDelete,
			editMode,
			confirm,
			OnEdit,
			domainID,
			openProject,
			isMounted,
			currentProductContent,
		};
	},
});
</script>
<style lang="sass" scoped>
.domain_wrapper .q-card
  width: 96%
.top_padding
  padding-top: 54px
.left_padding
  padding-left: 140px
.q-drawer
  z-index: -1 !important
.action_card__item
  display: flex
  flex-direction: row
.q-manu
  display: none !important
.globalTagTree_container
  border: 1px solid $white
  padding: 8px
.q-icon
  vertical-align: top
.monaco
  display: flex
  width: 100%
  height: 100vh !important
  padding-top: 30px
  scroll-y: hidden !important
  overflow: hidden
  background-color: $white

.monaco-editor
  display: flex
  width: 100%
  // height: 100vh !important
  // background-color: $white
</style>
