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
		<Drawer v-model="drawer">
			<template v-slot:drawerFilter>
				<div class="search_container">
					<q-input ref="filterRef" filled v-model="filter" label="Search">
						<template v-slot:append>
							<q-icon
								v-if="filter !== ''"
								name="clear"
								class="cursor-pointer"
								@click="resetFilter"
							/>
							<q-icon
								v-else
								name="search"
								class="cursor-pointer"
								@click="resetFilter"
							/>
						</template>
					</q-input>
					<div></div>
				</div>
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
import { defineComponent, ref } from "vue";
import AjaxBar from "components/UI/Progress/AjaxBar";
import Drawer from "components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../../common/index";
import useProductDetails from "../../composables/Products/useProductDetails";
import useDomainData from "../../composables/WorkSpace/useDomain";
import ProductDetailsNavigation from "components/UI/Stepper/ProductDetailsNavigation.vue";

export default defineComponent({
	name: "PageDomainChild",
	components: {
		AjaxBar,
		Drawer,
		AccountSettings,
		ProductDetailsNavigation,
	},
	props: ["id"],
	setup(props) {
		const drawer = ref(false);
		const oepnDialog = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const selected = ref("DDS");

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

		return {
			store,
			router,
			drawer,
			oepnDialog,
			filter,
			filterRef,
			filterTag,
			filterTagRef,
			selected,
			$q,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
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
