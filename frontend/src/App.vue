<template>
	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>
<script>
import API from "./services/index";
import { useStore } from "vuex";

export default {
	name: "App",
	setup() {
		// const store = useStore();
		// const refreshBrowser = () => {
		// 	const userString = localStorage.getItem("usser");
		// 	if (userString) {
		// 		const userData = userString;
		// 		console.log("userData: ", userData);
		// 		store.commit("auth/SET_USER_DATA", userData);
		// 		axios.defaults.headers.common["Authorization"] = `Bearer ${userData}`;
		// 	}
		// 	API.interceptors.response.use((response) => response);
		// };
		// return {
		//refreshBrowser,
		// };
	},
};
</script>

<style lang="sass">
.fade-enter-from, .fade-leave-to
  opacity: 0

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease-out
</style>
