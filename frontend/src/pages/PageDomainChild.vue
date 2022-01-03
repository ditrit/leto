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
					<q-tree :nodes="menu" node-key="label" />
				</div>
			</template>
		</Drawer>
		<q-page-container class="q-pa-lg">
			<q-page :style-fn="pageSizeTweak" class="q-pl-lg q-mt-lg">
				<div class="row">
					<div class="col-8">
						<ContentCard :data="child" />
					</div>
					<div class="col-4">
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
														<q-item clickable @click.prevent="OnSave">
															<q-item-section class="action_card__item">
																<q-icon
																	name="save"
																	size="1.5em"
																	class="q-mr-sm"
																/>
																Save</q-item-section
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
										v-for="(tag, index) in child"
										:key="index"
										:style="editMode ? 'border: 1px dashed grey' : ''"
										class="cards_tags_wrapper rounded-borders overflow-hidden"
									>
										<li
											v-for="(item, index) in tag.Tags"
											:key="index"
											:draggable="false"
											@dragstart="onDragStart"
											:class="item.class"
											:id="`box ${item.ID}`"
										>
											{{ item.Name }}
											<q-btn
												v-if="editMode"
												roundπ
												dense
												unelevated
												size="xs"
												color="red"
												text-color="white"
												icon="delete"
												@click.prevent="OnDelete(item.ID)"
												class="q-ml-sm"
											/>
										</li>
									</ul>
									<div v-if="globalTagsTreeList">
										<q-input
											ref="filterTagRef"
											filled
											v-model="filterTag"
											label="Filter"
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
												v-model:selected="isSelected"
												node-key="label"
												:filter="filterTag"
												default-expand-all
											/>
										</div>
									</div>
								</q-card-section>

								<div class="q-gutter-sm float-right" v-if="showButtons">
									<q-btn
										color="white"
										text-color="primary"
										label="Edit"
										@click.prevent="OnEdit"
									/>
									<q-btn
										color="white"
										text-color="primary"
										label="Save"
										@click.prevent="OnSave"
									/>
								</div>
							</q-card>
						</div>
					</div>
				</div>
				<div class="row q-mt-lg q-mr-lg">
					<div
						class="col panel_wrapper"
						v-for="(item, index) in child"
						:key="index"
					>
						<GlobalSearch class="global_Search__right" />
						<Tabs
							:allTags="null"
							:teamProducts="item.Products"
							:teamMembers="item.Authorizations"
							:teamLibraries="item.Libraries"
							:teamEnvironnements="item.Environments"
						/>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AjaxBar from "../components/UI/Progress/AjaxBar";
import ContentCard from "../components/UI/Cards/ContentCard";
import Tabs from "../components/UI/TabPanels/Tabs";
import GlobalSearch from "../components/UI/Form/GlobalSearch.vue";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../common/index";
export default defineComponent({
	name: "PageDomainChild",
	components: {
		AjaxBar,
		Tabs,
		ContentCard,
		GlobalSearch,
		Drawer,
		AccountSettings,
	},
	props: ["id"],
	setup(props) {
		const store = useStore();
		const drawer = ref(false);
		const router = useRouter();
		const progress = ref(null);
		const actionsLinks = ref(["Edit"]);
		const child = ref([]);
		const oepnDialog = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const globalTagsTreeList = ref([]);
		const choosenNodeID = ref("");
		const isSelected = ref(null);

		const goToID = async (node) => {
			choosenNodeID.value = await node.id;
			router.push(`/teams/${node.id}`);
			store.dispatch("appDomain/fetchDomainById", `${node.id}`);
			store.getters["appDomain/allDomaines"];
			console.log("choosenNodeID: ", choosenNodeID.value);

			console.log("props.id: ", props.id);
		};

		const addTagtoDomain = async (node) => {
			console.log(node);
			console.log("props.id: ", props.id);
		};
		addTagtoDomain();

		const menu = ref(null);
		const getMenuData = async () => {
			await store.dispatch("appDomain/fetchDomainesTree");
			const allDomainTree = computed(
				() => store.getters["appDomain/allDomainesTree"]
			);
			return (menu.value = [
				{
					id: allDomainTree?.value?.ID,
					parentID: allDomainTree?.value?.ParentID,
					label: allDomainTree?.value?.Name,
					avatar: allDomainTree?.value?.Logo,
					handler: (node) => goToID(node),
					children: allDomainTree?.value?.Childs?.map((item) => {
						return {
							id: item?.ID,
							parentID: item?.ParentID,
							label: item?.Name,
							avatar: item?.Logo,
							handler: (item) => goToID(item),
							children: item?.Childs?.map((subItem) => {
								return {
									id: subItem?.ID,
									parentID: subItem?.ParentID,
									label: subItem?.Name,
									avatar: subItem?.Logo,
									handler: (subItem) => goToID(subItem),
									children: subItem?.Childs?.map((subLastItem) => {
										return {
											id: subLastItem?.ID,
											parentID: subLastItem?.ParentID,
											label: subLastItem?.Name,
											avatar: subLastItem?.Logo,
											handler: (subLastItem) => goToID(subLastItem),
										};
									}),
								};
							}),
						};
					}),
				},
			]);
		};
		getMenuData();
		// console.log("details page menu.value: ", menu);
		const getTagsTree = async () => {
			await store.dispatch("appTags/fetchAllTagsTree");
			let data = computed(() => store.getters["appTags/allTagsTree"]);
			globalTagsTreeList.value = [data.value].map((tag) => {
				return {
					id: tag?.ID,
					label: tag?.Name,
					handler: (tag) => addTagtoDomain(tag),
					children: tag.Childs?.map((child) => {
						return {
							id: child.ID,
							label: child.Name,
							handler: (child) => addTagtoDomain(child),
						};
					}),
				};
			});
			console.log("globalTagsTreeList: ", globalTagsTreeList.value);
		};
		getTagsTree();
		const editMode = ref(false);
		const showButtons = ref(false);
		const showDraggable = ref(false);
		const isNew = ref(false);

		const OnNew = () => {
			console.log("OnNew Function");
			isNew.value = !isNew.value;
		};
		const OnEdit = () => {
			console.log("OnEdit Function");
			editMode.value = !editMode.value;
			showDraggable.value = !showDraggable.value;
		};
		const OnDelete = (id) => {
			console.log("deleted ID:", id);
		};
		const OnSave = () => {
			console.log("OnSave Function");
		};

		const getData = async () => {
			await store.dispatch("appDomain/fetchDomainById", `${props.id}`);
			let data = computed(() => store.getters["appDomain/allDomaines"]);
			progress.value = child.value.length;
			return (child.value = await data.value);
		};
		getData();
		// console.log("child data: ", child);
		return {
			drawer,
			oepnDialog,
			child,
			actionsLinks,
			Drawer,
			menu,
			choosenNodeID,
			goToID,
			filter,
			filterRef,
			filterTag,
			filterTagRef,
			isSelected,

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
			showButtons,
			showDraggable,

			isNew,
			OnNew,
			OnEdit,
			OnSave,
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
</style>
