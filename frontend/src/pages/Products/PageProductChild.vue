<template>
	<div>
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
			<SideBar side="left" class="" v-if="modelValue === isModelMode">
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

			<q-page-container class="q-pa-lg">
				<q-page :style-fn="pageSizeTweak" class="q-mt-lg">
					<Modelization
						v-if="modelValue === isModelMode"
						@getTreeObjects="tree"
					/>
					<Monaco v-show="modelValue === isSourceMode" />
				</q-page>
			</q-page-container>
		</q-layout>
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { mapActions } from "vuex";
import AjaxBar from "components/UI/Progress/AjaxBar";
import SideBar from "components/UI/Drawers/SideBar.vue";
import PaletteMenu from "components/PaletteMenu";
import { pageSizeTweak } from "src/common/index";
import Modelization from "components/2DModel/Modelization.vue";
import Monaco from "components/Monaco/Monaco.vue";
import useProductDetails from "src/composables/Products/useProductDetails";
import useDomainData from "src/composables/WorkSpace/useDomainData";
import ConfigPannel from "src/components/ConfigPannel.vue";
import awsMetadatas from "src/assets/plugins/terraform/internal/aws/metadatas.json";
import ProductHeader from "src/components/UI/Headers/ProductHeader.vue";

export default defineComponent({
	name: "PageDomainChild",
	components: {
		Modelization,
		Monaco,
		AjaxBar,
		PaletteMenu,
		ConfigPannel,
		SideBar,
		ProductHeader,
	},
	methods: {
		...mapActions({
			setResources: "appMonaco/setResources",
		}),
		tree(e) {
			this.objectsTree = e;
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
				Monaco.methods.getGraph();
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
				name: "SG-Interne",
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
</style>
