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

				<div class="row">
					<div class="col-8">
						<ContentCard :data="currentDomainDataContent" />
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
					</div>
				</div>
				<div class="row q-mt-lg q-mr-lg">
					<div
						class="col panel_wrapper"
						v-for="(item, index) in currentDomainDataContent"
						:key="index"
					>
						<GlobalSearch class="global_Search__right" />
						<Tabs
							:allTags="null"
							:teamProducts="item.products"
							:teamMembers="item.authorizations"
							:teamLibraries="item.libraries"
							:teamEnvironnements="domainEnvironments"
						/>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import ContentCard from "../components/UI/Cards/ContentCard";
import Tabs from "../components/UI/TabPanels/Tabs";
import GlobalSearch from "../components/UI/Form/GlobalSearch.vue";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
import { pageSizeTweak } from "../common/index";
import API from "../services";
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
		const $q = useQuasar();
		const drawer = ref(false);
		const router = useRouter();
		const progress = ref(null);
		const actionsLinks = ref(["Edit"]);
		const currentDomainDataContent = ref({});
		const domainTags = ref([]);
		const domainEnvironments = ref([]);
		const oepnDialog = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const filterTag = ref("");
		const filterTagRef = ref(null);
		const globalTagsTreeList = ref([]);
		const choosenNodeID = ref("");
		const selected = ref(null);

		const refreshDomain = async () => {
			await store.dispatch("appDomain/fetchDomainById", props.id);
			let data = computed(() => store.getters["appDomain/allDomaines"]);
			domainTags.value = await data.value[0].Tags;
			domainEnvironments.value = await data.value[0].Environments;
			console.log(
				"Refreshed domainEnvironments.value: ",
				domainEnvironments.value
			);
			console.log("	Refresh domainTags.value: ", domainTags.value);
		};

		const goToID = async (node) => {
			await router.push(`/teams/${node.id}`);
			editMode.value = false;
			choosenNodeID.value = await node.id;

			rigthData();
		};
		const rigthData = async () => {
			await store.dispatch("appDomain/fetchDomainById", `${props.id}`);
			let data = await store.getters["appDomain/allDomaines"];
			console.log("data: ", Object.values(data));
			progress.value = Object.values(data).length;
			currentDomainDataContent.value = Object.values(data).map((item) => {
				return {
					id: item.ID,
					name: item.Name,
					shortDescription: item.ShortDescription,
					description: item.Description,
					logo: item.Logo,
					tags: item.Tags,
					products: item.Products,
					envirnments: item.Environments,
					authorizations: item.Authorizations,
					libraries: item.Libraries,
					gitURL: item.GitURL,
					parentID: item.ParentID,
				};
			});
			console.log(
				"currentDomainDataContent.value: ",
				currentDomainDataContent.value
			);
			domainTags.value = currentDomainDataContent.value[0].tags;
			domainEnvironments.value = currentDomainDataContent.value[0].envirnments;
			console.log("domainEnvironments.value: ", domainEnvironments.value);
		};
		const addTagtoDomain = async (tag) => {
			console.log("tag:", tag);
			console.log("tag id:", tag.id);
			console.log("props.id: ", props.id);
			// store.dispatch("appDomain/addDomainTag", props.id, `${tag.id}`);
			//TODO: Modify Axios action
			await API.post(`/domain/${choosenNodeID.value}/tag/${tag.id}`)
				.then((response) => console.log(response))
				.then(() => refreshDomain())
				.catch((err) => console.log(err));
		};

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
					icon: "sell",
					children: tag.Childs?.map((child) => {
						return {
							id: child.ID,
							label: child.Name,
							handler: (child) => addTagtoDomain(child),
							icon: "sell",
							children: child.Childs?.map((subChild) => {
								return {
									id: subChild.ID,
									label: subChild.Name,
									handler: (subChild) => addTagtoDomain(subChild),
									icon: "sell",
									children: subChild.Childs?.map((lastChild) => {
										return {
											id: lastChild.ID,
											label: lastChild.Name,
											handler: (lastChild) => addTagtoDomain(lastChild),
											icon: "sell",
										};
									}),
								};
							}),
						};
					}),
				};
			});
			console.log("globalTagsTreeList: ", globalTagsTreeList.value);
		};
		getTagsTree();

		const confirm = (id) => {
			$q.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
				.onOk(() => {
					OnDelete(id);
				})
				.onCancel(() => {
					console.log("Cancel");
				});
		};
		const editMode = ref(false);

		const isNew = ref(false);

		const OnNew = () => {
			console.log("OnNew Function");
			isNew.value = !isNew.value;
		};
		const OnEdit = () => {
			editMode.value = !editMode.value;
		};
		const OnDelete = async (id) => {
			console.log("deleted ID:", id);
			//TODO: Add Axios Action
			await API.delete(`/domain/${props.id}/tag/${id}`)
				.then((response) => console.log(response))
				.then(() => refreshDomain())
				.catch((error) => console.log(error));
		};

		watchEffect(() => {
			console.log("Watching domainID", props.id);
			console.log("Watching domainID", choosenNodeID.value);
			console.log("Watching domainTags", domainTags.value);
			console.log(
				"Watching currentDomainDataContent",
				currentDomainDataContent.value
			);
			console.log("Watching domainEnvironments", domainEnvironments.value);
		});

		return {
			confirm,
			drawer,
			oepnDialog,
			goToID,
			choosenNodeID,
			currentDomainDataContent,
			domainTags,
			domainEnvironments,
			actionsLinks,
			Drawer,
			menu,
			filter,
			filterRef,
			filterTag,
			filterTagRef,
			selected,
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
			isNew,
			OnNew,
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
