<template>
	<q-layout class="domain_wrapper left_padding top_padding domain_page__child">
		<AjaxBar />
		<Drawer>
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
		<q-page class="bg-gray">
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
									v-mutation="handler1"
									@dragenter="onDragEnter"
									@dragleave="onDragLeave"
									@dragover="onDragOver"
									@drop="onDrop"
									class="
										cards_tags_wrapper
										drop-target
										rounded-borders
										overflow-hidden
									"
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
											round
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
								<div v-if="showDraggable">
									<ul
										:style="editMode ? 'border: 1px dashed grey' : ''"
										v-mutation="handler2"
										@dragenter="onDragEnter"
										@dragleave="onDragLeave"
										@dragover="onDragOver"
										@drop="onDrop"
										class="
											cards_tags_wrapper
											drop-target
											rounded-borders
											overflow-hidden
										"
									>
										<li
											v-for="(item, index) in globalTagsList"
											:key="index"
											:draggable="true"
											@dragstart="onDragStart"
											:class="item.class"
											:id="`box ${item.ID}`"
										>
											{{ item.Name }}
										</li>
									</ul>
								</div>
							</q-card-section>
							<!-- <div class="add_newtag q-pa-md" style="max-width: 400px">
								<form class="q-gutter-md" v-if="isNew">
									<input
										type="text"
										:model="tagName"
										name="name"
										placeholder="Name"
									/>
									<input
										type="text"
										name="shortDescription"
										placeholder="Short description"
										:model="tagshortDescription"
									/>
									<textarea
										type="text"
										name="description"
										placeholder="Description"
										:model="tagDescription"
									/>
									<div class="form_tags">
										<q-btn label="Submit" type="submit" color="primary" />
										<q-btn
											label="Reset"
											type="reset"
											color="primary"
											flat
											class="q-ml-sm"
										/>
									</div>
								</form>
							</div> -->
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
					class="col-12 panel_wrapper"
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

export default defineComponent({
	name: "PageDomainChild",
	components: {
		AjaxBar,
		Tabs,
		ContentCard,
		GlobalSearch,
		Drawer,
	},
	props: ["id"],
	setup(props) {
		const store = useStore();
		const router = useRouter();
		const progress = ref(null);
		const actionsLinks = ref(["Edit"]);
		const child = ref([]);
		const oepnDialog = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const globalTagsList = ref(null);

		const chosenNodeID = ref("");
		const goToID = async (node) => {
			chosenNodeID.value = await node.id;
			router.push(`/teams/${node.id}`);
			store.dispatch("appDomain/fetchDomainById", `${node.id}`);
			store.getters["appDomain/allDomaines"];
			console.log("chosenNodeID: ", chosenNodeID.value);
			console.log("props.id: ", props.id);
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
		console.log("details page menu.value: ", menu);
		const getAllTags = async () => {
			await store.dispatch("appTags/fetchAllTags");
			let data = computed(() => store.getters["appTags/allTags"]);
			console.log("globalTagsList.value: ", globalTagsList.value);
			return (globalTagsList.value = data.value);
		};
		getAllTags();
		const editMode = ref(false);
		const showButtons = ref(false);
		const showDraggable = ref(false);
		const isNew = ref(false);
		const status1 = ref([]);
		const status2 = ref([]);

		// const toggleEdit = () => {
		// 	console.log("Edit Me");
		// 	showButtons.value = !showButtons.value;
		// 	showDraggable.value = false;
		// 	editMode.value = false;
		// };

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
		console.log("child data: ", child);
		return {
			oepnDialog,
			child,
			actionsLinks,
			Drawer,
			menu,
			chosenNodeID,
			goToID,
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			editMode,
			showButtons,
			// toggleEdit,
			showDraggable,
			status1,
			status2,
			isNew,
			OnNew,
			OnEdit,
			OnSave,
			OnDelete,
			globalTagsList,

			handler1(mutationRecords) {
				status1.value = [];
				for (const index in mutationRecords) {
					const record = mutationRecords[index];
					const info = `type: ${record.type}, nodes added: ${
						record.addedNodes.length > 0 ? "true" : "false"
					}, nodes removed: ${
						record.removedNodes.length > 0 ? "true" : "false"
					}, oldValue: ${record.oldValue}`;
					status1.value.push(info);
				}
			},

			handler2(mutationRecords) {
				status2.value = [];
				for (const index in mutationRecords) {
					const record = mutationRecords[index];
					const info = `type: ${record.type}, nodes added: ${
						record.addedNodes.length > 0 ? "true" : "false"
					}, nodes removed: ${
						record.removedNodes.length > 0 ? "true" : "false"
					}, oldValue: ${record.oldValue}`;
					status2.value.push(info);
				}
			},

			// store the id of the draggable element
			onDragStart(e) {
				e.dataTransfer.setData("text", e.target.id);
				e.dataTransfer.dropEffect = "move";
			},

			onDragEnter(e) {
				// don't drop on other draggables
				if (e.target.draggable !== true) {
					e.target.classList.add("drag-enter");
				}
			},

			onDragLeave(e) {
				e.target.classList.remove("drag-enter");
			},

			onDragOver(e) {
				e.preventDefault();
			},

			onDrop(e) {
				e.preventDefault();

				// don't drop on other draggables
				if (e.target.draggable === true) {
					return;
				}

				const draggedId = e.dataTransfer.getData("text");
				const draggedEl = document.getElementById(draggedId);

				// check if original parent node
				if (draggedEl.parentNode === e.target) {
					e.target.classList.remove("drag-enter");
					return;
				}

				// make the exchange
				draggedEl.parentNode.removeChild(draggedEl);
				e.target.appendChild(draggedEl);
				e.target.classList.remove("drag-enter");
			},
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
.drop-target
  min-height: 160px
  width: 100%
  min-width: 200px
  background-color: transparent



.drag-enter
  outline-style: dashed

.box
  width: 100px
  height: 100px
  float: left
  cursor: pointer

@media only screen and (max-width: 500px)
  .drop-target
    height: 200px
    width: 100px
    min-width: 100px
    background-color: gainsboro

  .box
    width: 50px
    height: 50px

.box:nth-child(3)
  clear: both

.navy
  background-color: navy

.red
  background-color: firebrick

.green
  background-color: darkgreen

.orange
  background-color: orange

.action_card__item
  display: flex
  flex-direction: row
.q-manu
  display: none !important
</style>
