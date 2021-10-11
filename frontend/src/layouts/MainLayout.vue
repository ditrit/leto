<template>
	<q-layout view="lhh lpR fFf" class="bg-grey-4">
		<MainHeader style="z-index: 1">
			<AccountSettings />
		</MainHeader>
		<Drawer :data="data"> </Drawer>
		<q-drawer
			elevated
			show-if-above
			side="left"
			bordered
			:width="90"
			class="bg-primary centered"
		>
			<q-box class="absolute-top text-secondary centered">
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

		<q-page class="page_padding">
			<router-view />
		</q-page>
	</q-layout>
</template>

<script>
import { ref } from "vue";

import EssentialTools from "components/EssentialTools.vue";
import AccountSettings from "../components/Profil/AccountSettings.vue";

import Drawer from "../components/Drawers/Drawer.vue";
import MainHeader from "../components/Ui/Headers/mainHeader.vue";

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

export default {
	name: "MainLayout",
	components: {
		EssentialTools,
		AccountSettings,
		Drawer,
		MainHeader,
	},

	setup() {
		const data = ref([
			{
				label: "GIMS",
				children: [
					{
						label: "Team One",
						children: [
							{ label: "Sub Team 1 - 1" },
							{ label: "Sub Team 1 - 2" },
						],
					},
					{
						label: "Team Two",
						disabled: false,
						children: [
							{ label: "Sub Team 2 - 1" },
							{ label: "Sub Team 2 - 2" },
						],
					},
					{
						label: "Team Three",
						children: [
							{ label: "Sub Team 3 - 1" },
							{ label: "Sub Team 3 - 2" },
							{ label: "Sub Team 3 - 3" },
						],
					},
				],
			},
			{
				label: "BDDF",
				children: [
					{
						label: "Team One",
						children: [
							{ label: "Sub Team 1 - 1" },
							{ label: "Sub Team 1 - 2" },
						],
					},
					{
						label: "Team Two",
						disabled: false,
						children: [
							{ label: "Sub Team 2 - 1" },
							{ label: "Sub Team 2 - 2" },
						],
					},
					{
						label: "Team Three",
						children: [
							{ label: "Sub Team 3 - 1" },
							{ label: "Sub Team 3 - 2" },
							{ label: "Sub Team 3 - 3" },
						],
					},
				],
			},
		]);
		return {
			data,
			essentialTablinks,
			linksToolsList,
		};
	},
};
</script>
<style lang="sass">
.page_padding
	padding-top: 30px
	padding-right: 0px
	padding-bottom: 0px
	padding-left: 60px

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

.q-drawer--left
	// margin-top: 60px


.teams_buttons__container
	display: flex
	flex-direction: column
</style>
