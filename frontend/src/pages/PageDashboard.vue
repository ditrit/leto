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
			<ul v-if="user">
				<li v-for="element in currentuser" :key="element.ID">
					{{ element.Name }} {{ element.Email }}
				</li>
			</ul>
			<h2 v-if="!user">You are not logged in</h2>
			<button type="button" @click.prevent="logout">Logout</button>
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
import API from "../services/index";
import AjaxBar from "../components/Progress/AjaxBar.vue";
import getDataItems from "../composables/getDataItems";
import PageContent from "../components/Content/PageContent.vue";

export default {
	components: { AjaxBar, PageContent },
	setup() {
		const store = useStore();
		const users = ref([]);
		const user = ref(null);
		const currentuser = ref([]);
		user.value = store.getters["auth/user"];
		console.log("user: ", user.value);

		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/dashboard");
		dataItems.value = data;

		const getUsers = async () => {
			const response = await API.get("/user");
			users.value = response.data;
			currentuser.value = users.value.filter(
				(item) => item.Email === user.value.email
			);
			console.log("currentuser ", currentuser.value);
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
			user,
			users,
			currentuser,
			store,
			logout,
		};
	},
};
</script>

<style></style>
