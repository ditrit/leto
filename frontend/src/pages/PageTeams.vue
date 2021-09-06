<template>
	<q-layout class="bg-grey">
		<AjaxBar />

		<q-page padding class="flex bg-gray">
			<PageContent
				v-for="item in dataItems"
				:key="item.id"
				:icon="item.icon"
				:headline="item.headline"
				:textContent="item.textContent"
			/>

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
							<div class="text-h6">Create New Team</div>
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
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import getDataItems from "../composables/getDataItems";

import BtnAddNew from "../components/Buttons/BtnAddNew.vue";
import PageContent from "../components/Content/PageContent.vue";
import CreationFormStepper from "../components/Stepper/CreationFormStepper.vue";
import AjaxBar from "../components/Progress/AjaxBar.vue";

// import CreateItems from "../components/Dialogs/CreateItems.vue";
const buttonsList = [
	{
		title: "Add new Team",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "/",
	},
	{
		title: "Add to Favorite",
		styles: "q-mt-sm",
		color: "primary",
		icon: "favorite",
		link: "#/favorite",
	},
	{
		title: "Root Team",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "#/teams",
	},
];

export default defineComponent({
	name: "PageTeams",
	components: { BtnAddNew, PageContent, CreationFormStepper, AjaxBar },

	setup() {
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/teams");
		dataItems.value = data;

		return {
			progress: dataItems.length,
			path,
			dataItems,
			error,
			buttonsList,
			oepnDialog,
		};
	},
});
</script>
<style lang="sass" scoped>

.teams_buttons__container
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: flex-start
  flex: 1
</style>
