<template>
	<q-layout container style="height: 100vh" view="lHh lpR lFf">
		<q-header class="bg-white main_header">
			<q-toolbar>
				<div class="row">
					<q-btn
						flat
						@click="drawer = !drawer"
						round
						color="primary"
						icon="menu"
					/>
				</div>
				<AccountSettings />
			</q-toolbar>
		</q-header>
		<AjaxBar />

		<q-drawer
			side="right"
			show-if-above
			bordered
			:width="250"
			:breakpoint="500"
			class="bg-grey-3"
		>
		<h6>Object Details</h6>
		<div id="detailsContainer">
			<ConfigPannel></ConfigPannel>
		</div>
		</q-drawer>
		<Drawer v-model="drawer">
			<template v-slot:drawerFilter v-if="isMounted">
				<PaletteMenu id="paletteMenu"  :data="paletteData"></PaletteMenu>
			</template>
			<template v-slot:drawerMenu>
				<div class="q-pa-md q-gutter-sm" v-if="menu">
					<q-tree
						:nodes="menu"
						node-key="label"
						:filter="filter"
						v-model:selected="selected"
						default-expand-all
					/>
				</div>
			</template>
		</Drawer>

		<q-page-container class="q-pa-lg">
			<q-page :style-fn="pageSizeTweak" class="q-mt-lg">
				<ProductDetailsNavigation />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import AjaxBar from "components/UI/Progress/AjaxBar";
import Drawer from "components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import PaletteMenu from "components/PaletteMenu";
import { pageSizeTweak } from "../../common/index";
import useProductDetails from "../../composables/Products/useProductDetails";
import useDomainData from "../../composables/WorkSpace/useDomainData";
import ProductDetailsNavigation from "components/UI/Stepper/ProductDetailsNavigation.vue";
import ConfigPannel from "src/components/ConfigPannel.vue";

export default defineComponent({
	name: "PageDomainChild",
	components: {
		AjaxBar,
		Drawer,
		AccountSettings,
		PaletteMenu,
		ProductDetailsNavigation,
		ConfigPannel,
	},
	props: ["id"],
	setup(props) {
		const drawer = ref(false);
		const oepnDialog = ref(false);
		const filterRef = ref("");
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const selected = ref("DDS");
		const isMounted = ref(false);
		const svgs = ref({});

		let { store, router, $q, openProject } = useProductDetails();
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

		function makeToto(i) {
			return {
				name: `toto${i}`,
				description: `this is some toto ${20 - i}`,
				imageUrl: "/svgs/logos/conteneur.png",
			};
		}

		const paletteData = [
			{
				name: "AWS",
				icon: "explore",
				data:[],
			},
			{
				name: "SG-Interne",
				icon: "explore",
				data:[],
			},
		]

		const getSVGS = async () => {
			await store.dispatch("appSVGs/loadPath");
			svgs.value = await store.getters["appSVGs/allSvgs"];
			return svgs.value;
		};


		onMounted(async () => {
			await getSVGS();

			const awsMetadatas = require(`../../assets/plugins/terraform/internal/aws/metadatas.json`);
			awsMetadatas.provider.resources.forEach((element) => {
				paletteData[0].data.push(
					{
						name: element.resourceType,
						imageUrl: `logos/${element.icon}`,
						description: "Description",
					}
				)
			});
			const sgMetadatas = require(`../../assets/plugins/terraform/external/iactor-plugin-terraform-sginterne/metadatas.json`);
			sgMetadatas.provider.resources.forEach((element) => {
				paletteData[1].data.push(
					{
						name: element.resourceType,
						imageUrl: `logos/${element.icon}`,
						description: "Description",
					}
				)
			});
		isMounted.value = true;
		});

		return {
			store,
			router,
			drawer,
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
</style>
