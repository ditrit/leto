<template>
	<q-layout class="bg-grey-4">
		<AjaxBar />
		<q-page padding class="flex">
			<PageContent
				v-for="item in dataItems"
				:key="item.id"
				:icon="item.icon"
				:headline="item.headline"
				:textContent="item.textContent"
			/>
		</q-page>
	</q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import AjaxBar from "../components/Progress/AjaxBar.vue";
import getDataItems from "../composables/getDataItems";
import PageContent from "../components/Content/PageContent.vue";

export default {
	components: { AjaxBar, PageContent },
	setup() {
		const store = useStore();
		const user = ref(null);

		user.value = store.getters["auth/user"];

		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/dashboard");
		dataItems.value = data;

		const logout = () => {
			store.dispatch("auth/logout");
		};

		return {
			progress: dataItems.length,
			path,
			dataItems,
			error,
			user,
			store,
			logout,
		};
	},
};
</script>

<style></style>
