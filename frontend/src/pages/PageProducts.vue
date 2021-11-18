<template>
	<q-layout container style="height: 100vh" view="lHh lpR lFf">

		<q-header class="bg-white">
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
				<AccountSettings></AccountSettings>

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
				</div>
			</template>
			<template v-slot:drawerMenu>
				<ul>
					<li>7</li>
					<li>7</li>
					<li>7</li>
				</ul>
			</template>
		</Drawer>
		<q-page-container>
			<q-page :style-fn="pageSizeTweak" class="flex bg-gray">
				<PageContent
					v-for="item in dataItems"
					:key="item.id"
					:icon="item.icon"
					:headline="$t('products')"
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
							:title="$t('add_product')"
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
								<div class="text-h6">{{ $t("create_product") }}</div>
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
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import getDataItems from "../composables/getDataItems";
import BtnAddNew from "../components/UI/Buttons/BtnAddNew";
import PageContent from "../components/Content/PageContent";
import ProductCreationStepper from "../components/UI/Stepper/ProductCreationStepper";
import AjaxBar from "../components/UI/Progress/AjaxBar";
import Drawer from "../components/UI/Drawers/Drawer.vue";
import AccountSettings from "components/UI/Profil/AccountSettings";
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
	components: {
		AccountSettings,
		BtnAddNew,
		PageContent,
		ProductCreationStepper,
		AjaxBar,
		Drawer,
	},
	methods: {
		pageSizeTweak(offset) {
			return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
		}
	},

	setup() {
		const drawer = ref(true)
		const filter = ref("");
		const filterRef = ref(null);
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/products");
		dataItems.value = data;
		return {
			path,
			drawer,
			dataItems,
			error,
			buttonsList,
			oepnDialog,
			filter,
			filterRef,
			resetFilter() {
				filter.value = "";
				filterRef.value.focus();
			},
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
