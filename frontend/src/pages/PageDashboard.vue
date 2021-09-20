<template>
	<q-layout class="bg-grey">
		<AjaxBar />
		<q-page padding class="flex bg-gray">
			<PageContent
				v-for="item in dataItems"
				:key="item.id"
				:icon="item.icon"
				:headline="item.headline"
				:textContent="item.textContent"
			/>
			<!-- <button type="button" @click.prevent="logout">Logout</button> -->
			<ul>
				<li v-for="(user, index) in users" :key="index">
					<pre>{{ user }}</pre>
				</li>
			</ul>
		</q-page>
	</q-layout>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import AjaxBar from "../components/Progress/AjaxBar.vue";
import getDataItems from "../composables/getDataItems";
import PageContent from "../components/Content/PageContent.vue";

export default {
	components: { AjaxBar, PageContent },
	setup() {
		const store = useStore();
		const users = ref([]);

		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/dashboard");
		dataItems.value = data;

		const getUsers = async () => {
			const response = await axios.get(
				"http://127.0.0.1:9203/ditrit/Gandalf/1.0.0/user/"
			);
			users.value = response.data;
		};
		const logout = () => {
			store.dispatch("auth/logout");
		};
		getUsers();
		return {
			progress: dataItems.length,
			path,
			dataItems,
			error,
			users,
			store,
			logout,
		};
	},
};
</script>

<style></style>
