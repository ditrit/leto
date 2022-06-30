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
		caption: "Home",
		icon: "home",
		link: "#/home",
	},
	{
		title: "",
		caption: "Workspaces ",
		icon: "workspaces",
		link: "#/workspaces",
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
.productDetails_navbar
	display: flex
	flex-direction: row
	justify-content: flex-start
	align-items: center
	padding: 14px
	background: $white
	color: $primary

.productDetails_drawer
	position: relative
	top: 56px
	left: 90px
</style>
