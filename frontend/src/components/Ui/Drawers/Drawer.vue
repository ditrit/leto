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
					<MenuAccordion
						v-for="(item, index) in menu"
						:key="index"
						:logo="item.logo"
						:parentLabel="item.parentLabel"
						:icon="item.icon"
						:links="item.link"
					/>
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
		const menu = ref([
			{
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				parentLabel: "Parent 1",
				icon: "user",
				link: [
					"link 1",
					"link 2",
					"link 3",
					"link 4",
					"link 5",
					"link 6",
					"link 7",
				],
			},
			{
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				parentLabel: "Parent 2",
				icon: "user",
				link: ["link 1", "link 2", "link 3", "link 4", "link 5"],
			},
			{
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				parentLabel: "Parent 3",
				icon: "group",
				link: ["link 1", "link 2", "link 3"],
			},
			{
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				parentLabel: "Parent 4",
				icon: "mail",
				link: ["link 1", "link 2"],
			},
			{
				logo: "https://cdn.quasar.dev/img/parallax2.jpg",
				parentLabel: "Parent 5",
				icon: "cart",
				link: ["link 1", "link 2", "link 3", "link 4"],
			},
		]);
		const getMenuData = async () => {
			await store.dispatch("appDomain/fetchDomainesTree");
			const allDomainTree = await computed(
				() => store.getters["appDomain/allDomainesTree"]
			);
			let returnArray = Object.values(allDomainTree.value);
			console.log(
				"returnArray: ",
				returnArray[1].map((item) => item.Domain.Name)
			);
		};
		getMenuData();

		const getDomainTags = store.dispatch(
			"appDomain/fetchDomainTags",
			"703688716410650625"
		);

		const allDomainTags = computed(
			() => store.getters["appDomain/allDomainTag"]
		);

		console.log(allDomainTags.value);
		const filter = ref("");
		const filterRef = ref(null);
		return {
			menu,
			getDomainTags,
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
