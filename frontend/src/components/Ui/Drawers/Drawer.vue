<template>
	<div>
		<q-toolbar>
			<div class="row">
				<q-btn
					flat
					@click="drawer = !drawer"
					round
					color="white"
					icon="menu"
					:class="
						drawer
							? 'q-pa-md bg-primary menuStyle hiddenMenu'
							: ' q-pa-md bg-primary menuStyle visibleMenu'
					"
				/>
			</div>
		</q-toolbar>
		<q-drawer
			v-model="drawer"
			@hide="makeMenuVisible"
			show-if-above
			@click.capture="drawerClick"
			:width="300"
			:breakpoint="500"
			bordered
			class="bg-grey-3"
			style="
				transform: translateX(90px);
				box-shadow: 1px 0 6px rgb(0, 0, 0, 0.5);
			"
		>
			<slot>
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
					<div>
						<MenuAccordion
						 v-for="(item, index) in menu"
							:key="index"
							:id="item.id"
							:logo="item.logo"
							:parentLabel="item.parentName"
							:links="item.childs.map(item => item.name)"
						>
						<MenuAccordion 	
							 v-for="(child, index) in item.Childs"
							:key="index"	
					    :id="itechildm.id"
							:logo="child.logo"
							:parentLabel="child.parentName" />
						</MenuAccordion>
					</div>

				</div>
			</slot>
		</q-drawer>
	</div>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import MenuAccordion from "../Accordion/MenuAccordion";

export default {
	components: { MenuAccordion },
	props: {
		data: {
			type: Array,
		},
	},
	setup() {
		const store = useStore();
		const menu = ref(null);
		const getMenuData = async () => {
			await store.dispatch("appDomain/fetchDomainesTree");
			const allDomainTree = await computed(
				() => store.getters["appDomain/allDomainesTree"]
			);
			console.log("allDomainTree: ", allDomainTree.value);
			console.log("allDomainTree  name: ", allDomainTree.value.Name);
			console.log(
				"allDomainTree  childs: ",
				allDomainTree.value.Childs.map((item) => item.Name)
			);
			return menu.value = [{
				id: allDomainTree.value.ID,
				name: allDomainTree.value.Name,
				label: allDomainTree.value.Name,
				value: allDomainTree.value.Name,
				parentName: allDomainTree.value?.Name,
				parentId: allDomainTree.value?.ParentID,
				logo: allDomainTree.value?.Logo,
				childs: allDomainTree.value?.Childs.map(item => {
					return {
						id: item.ID,
						name: item.Name,
						logo: item.Logo,
					}
				}),
			}]
	
		console.log("	menu.value : ", menu.value);
		};
		getMenuData();

		// API Testing:
		// const getDomainTags = store.dispatch(
		// 	"appDomain/fetchDomainTags",
		// 	"703911909106483201"
		// );

		// const allDomainTags = computed(
		// 	() => store.getters["appDomain/allDomainTag"]
		// );

		/*
TODO:
Make ids value dynamic
 */
		// const addDomainTags = store.dispatch(
		// 	"appDomain/addDomainTag",
		// 	"703911909106483201",
		// 	"703917905933860865"
		// );
		// const removeDomainTag = store.dispatch(
		// 	"appDomain/removeDomainTag",
		// 	"703911909106483201",
		// 	"703917905933860865"
		// );

		// console.log(allDomainTags.value);
		const filter = ref("");
		const filterRef = ref(null);
		return {
			menu,
			// getDomainTags,
			// addDomainTags,
			// removeDomainTag,
			drawer: ref(false),
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
		};
	},
};
</script>
<style lang="sass">

.menuStyle
	background: #eeeeee
	border-radius: 0
	z-index: 5000

.hiddenMenu
	transform: translateX(376px)

.visibleMenu
	transform: translateX(78px)

.q-tree__node-header-content
	font-weight: bold

.q-tree__node .q-tree__children .q-tree__node-header-content
	font-weight: 400
	color: var(--gray)
</style>
