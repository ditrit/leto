<template>
	<div class="profil_settings" style="z-index: 2">
		<q-item clickable>
			<q-item-section>
				<q-avatar round size="40px" v-if="user">
					<img :src="user.Logo ? user.Logo : logo" />
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-menu>
			<div class="row no-wrap q-pa-md">
				<q-list separator>
					<q-item clickable v-ripple>
						<q-item-section>
							<router-link to="/dashboard">Dashboard</router-link>
						</q-item-section>
					</q-item>

					<q-item clickable v-ripple>
						<q-item-section>
							<q-item-label>
								<router-link to="/settings">Settings</router-link>
							</q-item-label>
						</q-item-section>
					</q-item>

					<q-item>
						<LangSwitcher />
					</q-item>
				</q-list>

				<q-separator vertical inset class="q-mx-lg" />

				<div class="column" v-if="user">
					<q-avatar size="72px">
						<img :src="user.Logo ? user.Logo : logo" />
					</q-avatar>

					<div class="q-mt-md q-mb-xs">
						Hi, {{ user.FirstName }} {{ user.LastName }}
					</div>

					<q-btn
						color="primary"
						label="Logout"
						push
						size="md"
						v-close-popup
						@click.prevent="logout"
					/>
				</div>
			</div>
		</q-menu>
	</div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LangSwitcher from "../../LangSwitcher.vue";
export default {
	components: { LangSwitcher },
	props: {
		logo: {
			type: String,
			default: "https://cdn.quasar.dev/img/boy-avatar.png",
		},
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const user = ref(null);
		const refresh = () => {
			window.addEventListener("beforeunload", (event) => {
				console.log("event: ", event);
			});
		};
		refresh();
		const getToken = async () => {
			const token = localStorage.getItem("user");
			console.log("token: ", token);
			store.dispatch("auth/currentUser");
			if (token) {
				user.value = store.getters["auth/currentUser"];
				console.log("user: ", user.value);
			} else {
				user.value = store.getters["auth/currentUser"];
				console.log("user2: ", user.value);
			}
		};
		getToken();

		const logout = () => {
			store.dispatch("auth/logout");
			router.push("/login");
		};

		return {
			user,
			logout,
		};
	},
};
</script>
<style lang="sass" scoped>
.profil_settings
	position: absolute
	right: 20px
</style>
