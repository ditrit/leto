<template>
	<router-view v-slot="{ Component }">
		<transition name="fade" mode="out-in">
			<component :is="Component" />
		</transition>
	</router-view>
</template>
<script>
import { defineComponent } from "vue";
import store from "./store/index";
import axios from "axios";
import { useStore } from "vuex";

export default defineComponent({
	name: "App",
	// created() {
	// 	const userString = localStorage.getItem("user");
	// 	if (userString) {
	// 		const userData = userString;
	// 		console.log("userData: ", userData);

	// 		store().commit("auth/SET_USER_DATA", userData);
	// 	}
	// 	axios.interceptors.response.use(
	// 		(response) => response,
	// 		(error) => {
	// 			if (error.response.status === 401) {
	// 				store().dispatch("auth/logout");
	// 			}
	// 			return Promise.reject(error);
	// 		}
	// 	);
	// },
	setup() {
		const store = useStore();
		const userString = localStorage.getItem("user");
		if (userString) {
			const userData = userString;
			console.log("userData: ", userData);
			store.commit("auth/SET_USER_DATA", userData);
		}
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response.status === 401) {
					store.dispatch("auth/logout");
				}
				return Promise.reject(error);
			}
		);
		return { store };
	},
});
</script>

<style lang="sass">
.fade-enter-from, .fade-leave-to
  opacity: 0

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease-out
</style>
