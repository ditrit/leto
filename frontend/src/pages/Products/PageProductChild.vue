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

		<Drawer v-model="drawer" id="drawerHamburgerMenu">
			<template v-slot:drawerFilter>
				<PaletteMenu :data="mockData"></PaletteMenu>
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

		<q-page style="height: 100vh">
			<ProductDetailsNavigation />
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import AjaxBar from "components/UI/Progress/AjaxBar";
import Drawer from "components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import PaletteMenu from "components/PaletteMenu";
import { pageSizeTweak } from "src/common/index";
import useProductDetails from "src/composables/Products/useProductDetails";
import useDomainData from "src/composables/WorkSpace/useDomainData";
import ProductDetailsNavigation from "components/UI/Stepper/ProductDetailsNavigation.vue";

export default defineComponent({
	name: "PageDomainChild",
	components: {
		AjaxBar,
		Drawer,
		AccountSettings,
		PaletteMenu,
		ProductDetailsNavigation,
	},
	props: ["id"],
	setup(props) {
		const drawer = ref(false);
		const oepnDialog = ref(false);
		const filterRef = ref("");
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const selected = ref("DDS");
		const drawerHamburgerMenu = ref(false);

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
		const mockData = [
			{
				name: "AWS",
				icon: "explore",
				data: Array.from({ length: 20 }).map((_, i) => makeToto(i)),
			},
			{
				name: "SG Internal",
				icon: "explore",
				data: Array.from({ length: 20 }).map((_, i) => makeToto(i)),
			},
			{
				name: "Templates",
				data: Array.from({ length: 20 }).map((_, i) => makeToto(i)),
			},
		];

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
			mockData,
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
			drawerHamburgerMenu,
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
