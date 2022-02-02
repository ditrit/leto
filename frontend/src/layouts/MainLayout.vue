<template>
	<q-layout view="lhh lpR fFf" class="bg-grey-4">
		<!-- Main Menu Drawer-->
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
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import EssentialTools from "components/EssentialTools";
const linksToolsList = [
	{
		title: "",
		caption: "Workspaces ",
		icon: "workspaces",
		link: "#/workspaces",
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
export default {
	name: "MainLayout",
	components: {
		EssentialTools,
	},

	setup() {
		return {
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
