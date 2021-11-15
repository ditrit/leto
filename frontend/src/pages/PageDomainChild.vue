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
									<CardButtons :links="actionsLinks" />
								</div>
							</q-card-section>
							<q-card-section>
								<ul
									v-for="(tag, index) in child"
									:key="index"
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
										draggable="true"
										@dragstart="onDragStart"
										:class="item.class"
										:id="`box ${index + 1}`"
									>
										{{ item.Name }}
									</li>
								</ul>
								<ul
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
								/>
							</q-card-section>
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
import AjaxBar from "../components/UI/Progress/AjaxBar";
import CardButtons from "../components/UI/Cards/CardButtons";
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
		CardButtons,
		GlobalSearch,
		Drawer,
	},
	props: ["id"],
	setup(props) {
		const store = useStore();
		const progress = ref(null);
		const actionsLinks = ref(["Edit"]);
		const child = ref([]);
		const oepnDialog = ref(false);
		const filter = ref("");
		const filterRef = ref(null);
		const status1 = ref([]);
		const status2 = ref([]);

		const getData = async () => {
			await store.dispatch("appDomain/fetchDomainById", `${props.id}`);
			let data = computed(() => store.getters["appDomain/allDomaines"]);
			progress.value = child.value.length;
			return (child.value = await data.value.sort());
		};
		getData();
		console.log("child data: ", child);
		return {
			oepnDialog,
			child,
			actionsLinks,
			Drawer,
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
			status1,
			status2,

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
  min-height: 120px
  width: 100%
  min-width: 200px
  background-color: transparent
  border: 1px dashed $grey

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
</style>
