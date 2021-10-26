<template>
	<q-layout>
		<!-- <AjaxBar /> -->
		<q-page padding class="bg-gray">
			<PageContent
				v-for="item in dataItems"
				:key="item.id"
				:icon="item.icon"
				:headline="item.headline"
				:textContent="item.textContent"
			/>
			<div class="buttons_wrapper">
				<div
					class="teams_buttons__container"
					v-for="btn in buttonsList"
					:key="btn.title"
				>
					<BtnAddNew
						v-show="dataItems.length === 1"
						:title="btn.title"
						:class="btn.styles"
						outline
						round
						:color="btn.color"
						:icon="btn.icon"
						:href="btn.link"
						@click="oepnDialog = true"
					/>
					<!-- <CreateItems /> -->
					<q-dialog v-model="oepnDialog">
						<q-card style="width: 700px; max-width: 80vw">
							<q-card-section>
								<div class="text-h6 q-pa-md">Create New Team</div>
							</q-card-section>
							<q-card-section class="q-pt-none">
								<CreationFormStepper />
							</q-card-section>
							<q-card-actions align="right" class="bg-white text-teal">
								<q-btn flat label="Next" v-close-popup />
							</q-card-actions>
						</q-card>
					</q-dialog>
				</div>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
// import { useStore } from "vuex";
import getDataItems from "../composables/getDataItems";
import BtnAddNew from "../components/UI/Buttons/BtnAddNew";
import PageContent from "../components/Content/PageContent";
import CreationFormStepper from "../components/UI/Stepper/CreationFormStepper";
// import AjaxBar from "../components/UI/Progress/AjaxBar";

const buttonsList = [
	{
		title: "Add new Team",
		styles: "bg-white q-mt-sm",
		color: "primary",
		icon: "add",
		link: "/",
	},
	// {
	// 	title: "Add to Favorite",
	// 	styles: "bg-white q-mt-sm",
	// 	color: "primary",
	// 	icon: "favorite",
	// 	link: "#/favorite",
	// },
	// {
	// 	title: "Root Team",
	// 	styles: "bg-white q-mt-sm",
	// 	color: "primary",
	// 	icon: "add",
	// 	link: "#/teams",
	// },
];

export default defineComponent({
	name: "PageTeams",
	components: { BtnAddNew, PageContent, CreationFormStepper },

	setup() {
		// const allTags = ref([]);
		// const allDomains = ref([]);
		// const store = useStore();
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/teams");
		dataItems.value = data;

		// fetch All Domaines
		// const fetchDomaines = store.dispatch("appDomain/fetchAllDomaines");
		// const getDomaies = computed(() => store.getters["appDomain/allDomaines"]);
		// allDomains.value = getDomaies.value;
		// console.log("getDomaies team page : ", allDomains.value);

		// fetch All Tags
		// const fetchTags = store.dispatch("appTags/fetchAllTags");
		// allTags.value = store.getters["appTags/allTags"];
		// console.log("tagsvalue : ", allTags.value);

		return {
			// progress: dataItems.length,
			path,
			dataItems,
			error,
			buttonsList,
			oepnDialog,
			// fetchDomaines,
			// getDomaies,
			// allTags,
			// fetchTags,
		};
	},
});
</script>
<style lang="sass" scoped>
.buttons_wrapper
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center

.teams_buttons__container
  display: flex
  flex-direction: column
</style>
