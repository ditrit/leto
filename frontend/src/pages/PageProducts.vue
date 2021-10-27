<template>
	<q-layout class="page_padding">
		<AjaxBar />
		<q-page class="flex bg-gray">
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
				<transiton name="fade" v-if="dataItems">
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
				</transiton>
				<!-- <CreateItems /> -->
				<q-dialog v-model="oepnDialog">
					<q-card style="width: 700px; max-width: 80vw">
						<q-card-section>
							<div class="text-h6">Create New Product</div>
						</q-card-section>

						<q-card-section class="q-pt-none">
							<ProductCreationStepper />
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
import BtnAddNew from "../components/UI/Buttons/BtnAddNew";
import PageContent from "../components/Content/PageContent";
import ProductCreationStepper from "../components/UI/Stepper/ProductCreationStepper";
import AjaxBar from "../components/UI/Progress/AjaxBar";
// import CreateItems from "../components/Dialogs/CreateItems.vue";
const buttonsList = [
	{
		title: "Add new product",
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
		title: "Navigate",
		styles: "q-mt-sm",
		color: "primary",
		icon: "add",
		link: "#/products",
	},
];

export default defineComponent({
	name: "PageTeams",
	components: { BtnAddNew, PageContent, ProductCreationStepper, AjaxBar },

	setup() {
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/products");
		dataItems.value = data;
		return {
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
  height: fit-content
  flex: 1

.fade-enter-from, .fade-leave-to
  opacity: 0

.fade-enter-active, .fade-leave-active
  transition: opacity 3s ease-out
</style>
