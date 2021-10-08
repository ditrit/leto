<template>
	<q-layout view="lhh lpR fFf" class="bg-grey-4">
		<q-header
			reveal
			class="bg-white text-primary"
			:style="drawer ? 'left: 350px' : 'left: 90px'"
		>
			<q-toolbar class="justify-between">
				<!-- <div class="row">
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
				</div> -->
				<global-search
					:style="drawer ? 'margin-left: 25%' : 'margin-left: 35%'"
				/>
				<AccountSettings />
			</q-toolbar>
		</q-header>
		<q-toolbar>
			<div class="row">
				<q-btn
					flat
					@click="drawer = !drawer"
					round
					dense
					icon="menu"
					:class="drawer ? 'menuStyle hiddenMenu' : ' menuStyle visibleMenu'"
				/>
			</div>
		</q-toolbar>
		<q-drawer
			v-model="drawer"
			@hide="makeMenuVisible"
			show-if-above
			@click.capture="drawerClick"
			:width="350"
			:breakpoint="500"
			bordered
			class="bg-grey-3"
		>
			<div class="q-mt-md" style="max-width: 350px">
				<div class="q-gutter-md">
					<q-input
						v-model="search"
						debounce="500"
						placeholder="Search"
						class="search_input q-mb-lg q-pa-md"
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</div>
			</div>
			<q-list v-for="item in filterdSidebarItem" :key="item.id">
				<q-expansion-item
					group="somegroup"
					:icon="item.icon"
					:label="item.caption"
					:data-id="item.attr"
					default-opened
					header-class="text-primary"
					style="font-weight: 600"
				>
					<q-item
						v-for="child in item.children"
						:key="child.id"
						:data-id="child.attr"
						clickable
						v-ripple
					>
						<q-item-section avatar class="q-pl-md">
							<q-icon color="grey" :name="child.icon" size="16px" />
						</q-item-section>
						<q-item-section style="color: grey">{{
							child.caption
						}}</q-item-section>
					</q-item>
				</q-expansion-item>
				<q-sepaartor />
			</q-list>
		</q-drawer>

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

		<q-page
			class="q-pa-lg bg-gray"
			:style="drawer ? 'margin-left: 360px' : 'margin-left: 90px'"
		>
			<router-view />
		</q-page>
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

export default defineComponent({
	name: "MainLayout",
	components: {
		EssentialTools,
		AccountSettings,
		GlobalSearch,
	},

	setup() {
		const leftDrawerOpen = ref(false);
		return {
			leftDrawerOpen,
			essentialTablinks,
			drawer: ref(false),
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

.q-drawer--left
	// margin-top: 60px


.teams_buttons__container
	display: flex
	flex-direction: column

.menuStyle
	background: #eeeeee
	border-radius: 0
	margin-top: -14px
	z-index: 5000

.hiddenMenu
	transform: translateX(338px)

.visibleMenu
	transform: translateX(80px)
</style>
