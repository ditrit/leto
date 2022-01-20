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
						default-expand-all
						v-model:selected="selected"
					/>
				</div>
			</template>
		</Drawer>
		<q-page-container class="q-pa-lg">
			<q-page :style-fn="pageSizeTweak" class="q-pl-lg q-mt-lg">
				<div class="q-pa-md q-gutter-sm">
					<q-breadcrumbs v-for="link in menu" :key="link.id">
						<q-breadcrumbs-el label="Teams " icon="home" to="/teams" />
						<q-breadcrumbs-el
							:label="link.label + ' '"
							:to="`/teams/${link.id}`"
						/>
						<q-breadcrumbs-el
							v-for="childLink in link.children"
							:key="childLink.id"
							:label="childLink.label + ' '"
							:to="`/teams/${childLink.id}`"
						/>
						<q-breadcrumbs-el
							v-for="subChildLink in childLink"
							:key="subChildLink.id"
							:label="subChildLink.label + ' '"
							:to="`/teams/${subChildLink.id}`"
						/>
					</q-breadcrumbs>
					<!-- <pre>{{ menu }}</pre> -->
				</div>

				<div class="">
					<div class="col">
						<ContentCard :data="currentDomainDataContent">
							<template v-slot:tagsCard>
								<section class="col-4">
									<div class="tags_wrapper">
										<q-card flat bordered class="card_tags_default">
											<q-card-section>
												<div class="row items-center no-wrap">
													<div class="col">
														<div class="row">
															<q-icon name="sell" size="30px" class="q-mr-sm" />
															<div class="text-h6">Tags</div>
														</div>
													</div>
													<div class="button_actions__container col-auto">
														<q-btn color="grey-7" round flat icon="more_vert">
															<q-menu cover auto-close>
																<q-list>
																	<q-item clickable @click.prevent="OnEdit">
																		<q-item-section class="action_card__item">
																			<q-icon
																				name="edit"
																				size="1.5em"
																				class="q-mr-sm"
																			/>
																			Edit</q-item-section
																		>
																	</q-item>
																</q-list>
															</q-menu>
														</q-btn>
													</div>
												</div>
											</q-card-section>
											<q-card-section>
												<ul
													class="cards_tags_wrapper rounded-borders overflow-hidden"
												>
													<li
														v-for="(item, index) in domainTags"
														:key="index"
														:class="item.class"
													>
														{{ item.Name }}
														<q-btn
															v-if="editMode"
															round
															dense
															unelevated
															size="xs"
															color="red"
															text-color="white"
															icon="delete"
															@click.prevent="confirm(item.ID)"
															class="q-ml-sm"
														/>
													</li>
												</ul>
												<div
													v-if="globalTagsTreeList"
													v-show="editMode"
													class="globalTagTree_container"
												>
													<q-input
														ref="filterTagRef"
														v-model="filterTag"
														label="Search"
														dense
													>
														<template v-slot:append>
															<q-icon
																v-if="filterTag !== ''"
																name="clear"
																class="cursor-pointer"
																@click="resetFilterTag"
															/>
														</template>
													</q-input>
													<div class="q-pa-md q-gutter-sm">
														<q-tree
															dense
															:nodes="globalTagsTreeList"
															node-key="label"
															:filter="filterTag"
															default-expand-all
														/>
													</div>
												</div>
											</q-card-section>
										</q-card>
									</div>
								</section>
							</template>
						</ContentCard>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import ContentCard from "../components/UI/Cards/ContentCard";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../common/index";
import useDomainData from "../composables/useDomain";

export default defineComponent({
	name: "PageDomainChild",
	components: {
		AjaxBar,
		ContentCard,
		Drawer,
		AccountSettings,
	},
	props: ["id"],
	setup(props) {
		const drawer = ref(false);
		const actionsLinks = ref(["Edit"]);
		const oepnDialog = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const selected = ref(null);

		let {
			menu,
			store,
			getMenuData,
			goToID,
			router,
			rigthData,
			choosenNodeID,
			currentDomainDataContent,
			progress,
			domainTags,
			globalTagsTreeList,
			getTagsTree,
			refreshDomain,
			OnDelete,
			editMode,
			$q,
			confirm,
			OnEdit,
		} = useDomainData();

		// watch(currentDomainDataContent, (newVal, preVal) => {
		// 	console.log("currentDomainDataContent: ", currentDomainDataContent.value);
		// 	console.log("currentDomainDataContent preVal: ", preVal);
		// 	console.log("currentDomainDataContent newVal: ", newVal);
		// });

		return {
			confirm,
			progress,
			store,
			router,
			drawer,
			oepnDialog,
			goToID,
			refreshDomain,
			rigthData,
			choosenNodeID,
			currentDomainDataContent,
			domainTags,
			getTagsTree,
			actionsLinks,
			Drawer,
			menu,
			getMenuData,
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
			editMode,
			OnEdit,
			OnDelete,
			globalTagsTreeList,
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
