<template>
	<q-layout view="lhh lpR fFf" class="bg-grey-4">
		<q-header reveal class="bg-white text-primary">
			<q-toolbar class="justify-between">
				<div class="row">
					<q-tabs
						caps
						active-color="secondary"
						indicator-color="transparent"
						class="text-primary"
						v-model="tab"
					>
						<q-route-tab
							v-for="item in essentialTablinks"
							:key="item.id"
							:name="item.name"
							:label="item.label"
							:to="item.link"
							:data-id="item.name"
							exact
						/>
					</q-tabs>
				</div>
				<global-search />
				<AccountSettings />
			</q-toolbar>
		</q-header>

		<q-drawer
			show-if-above
			side="left"
			bordered
			:width="90"
			class="bg-primary centered"
		>
			<q-box class="absolute-top text-secondary centered">
				<!-- <q-toolbar-title class="centered q-pa-md">Leto</q-toolbar-title> -->
				<q-img
					class="q-mt-sm"
					src="../assets/logoBest2.svg"
					style="height: 5%; width: 55%"
				></q-img>
			</q-box>

			<EssentialTools
				v-for="link in linksToolsList"
				:key="link.title"
				v-bind="link"
			/>
		</q-drawer>

		<q-page-container class="bg-gray">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

import EssentialTools from "components/EssentialTools.vue";
import AccountSettings from "../components/Profil/AccountSettings.vue";
import GlobalSearch from "../components/Form/GlobalSearch.vue";

// import MainMenu from "components/MainMenu";
// import Accordion from "components/TabsPanels/Accordion";

const linksToolsList = [
	{
		title: "",
		caption: "Teams ",
		icon: "group",
		link: "#/teams",
	},
	{
		title: "",
		caption: "Ide ",
		icon: "edit",
		link: "#/model",
	},
	{
		title: "",
		caption: "Products",
		icon: "apps",
		link: "#/products",
	},
	{
		title: "",
		caption: "Libraries",
		icon: "library_books",
		link: "#/libraries",
	},
	{
		title: "",
		caption: "Dashboard",
		icon: "dashboard",
		link: "#/dashboard",
	},
	{
		title: "",
		caption: "Settings",
		icon: "settings",
		link: "#/settings",
	},
];
const essentialTablinks = [
	{
		id: 1,
		name: "modal",
		label: "Model",
		link: "/model",
	},
	{
		id: 2,
		name: "source",
		label: "Source",
		link: "/source",
	},
];
const mainMenuList = [
	{
		title: "Fichier",
		link: "",
	},
	{
		title: "Edition",
		link: "",
	},
	{
		title: "Selection",
		link: "",
	},
	{
		title: "Affichage",
		link: "",
	},
	{
		title: "",
		link: "",
	},
];
const profil = [
	{
		id: 1,
		firstName: "Bs",
		lastName: "Sr",
		notification: 2,
		image: "https://avatars.githubusercontent.com/u/7687826?s=60&v=4",
	},
];

export default defineComponent({
	name: "MainLayout",
	components: {
		EssentialTools,
		AccountSettings,
		GlobalSearch,
		// Accordion,
	},

	setup() {
		const leftDrawerOpen = ref(false);
		return {
			leftDrawerOpen,
			essentialTablinks,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
			linksToolsList,
		};
	},
});
</script>
<style lang="sass">
.full_height
	height: inherit

.width_19
	width: 19%

.centered
	display: flex
	align-items: center
	flex-direction: column
	justify-content: center
	box-sizing: border-box
	overflow-x: hidden
</style>
