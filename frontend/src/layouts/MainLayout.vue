<template>
	<q-layout view="lhh lpR fFf" class="bg-grey-4 q-pr-md">
		<MainHeader style="z-index: 1">
			<AccountSettings />
			<!-- <GlobalSearch /> -->
		</MainHeader>

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
					style="height: 5%; width: 55%; z-index: 5000 !important"
				></q-img>
			</q-box>
			<EssentialTools
				v-for="link in linksToolsList"
				:key="link.title"
				v-bind="link"
			/>
		</q-drawer>
		<q-page>
			<router-view />
		</q-page>
	</q-layout>
</template>

<script>
import EssentialTools from "components/EssentialTools";
import AccountSettings from "../components/UI/Profil/AccountSettings";

import MainHeader from "../components/UI/Headers/MainHeader";
// import GlobalSearch from "../components/UI/Form/GlobalSearch";

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

export default {
	name: "MainLayout",
	components: {
		EssentialTools,
		AccountSettings,
		MainHeader,

		// GlobalSearch,
	},

	setup() {
		return {
			essentialTablinks,
			linksToolsList,
		};
	},
};
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

.teams_buttons__container
	display: flex
	flex-direction: column
</style>
