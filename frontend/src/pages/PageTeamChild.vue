<template>
	<q-layout>
		<AjaxBar />
		<q-page padding class="bg-gray">
			<PageContent
				v-for="item in dataItems"
				:key="item.child.id"
				:icon="item.child.icon"
				:headline="item.child.headline"
				:subTitle="item.child.subTitle"
				:logo="item.child.logo"
				:textContent="item.textContent"
			/>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import getDataItems from "../composables/getDataItems";

import PageContent from "../components/Content/PageContent.vue";
import AjaxBar from "../components/Progress/AjaxBar.vue";

const buttonsList = [
	{
		title: "Add new Team",
		styles: "bg-white q-mt-sm",
		color: "primary",
		icon: "add",
		link: "/",
	},
	{
		title: "Add to Favorite",
		styles: "bg-white q-mt-sm",
		color: "primary",
		icon: "favorite",
		link: "#/favorite",
	},
	{
		title: "Root Team",
		styles: "bg-white q-mt-sm",
		color: "primary",
		icon: "add",
		link: "#/teams",
	},
];

export default defineComponent({
	name: "PageTeamChild",
	components: { PageContent, AjaxBar },

	setup() {
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const response = fetchData("http://localhost:3000/teams");
		dataItems.value = response;
		console.log("dataItems.value : ", dataItems);

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
.buttons_wrapper
  display: flex
  flex-direction: row
  justify-content: space-evenly
  align-items: center

.teams_buttons__container
  display: flex
  flex-direction: column
</style>
