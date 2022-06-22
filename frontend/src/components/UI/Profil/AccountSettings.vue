<template>
	<div class="profil_settings" style="z-index: 2">
		<q-item clickable>
			<q-item-section>
				<q-avatar round size="40px" v-if="user">
					<img
						:src="user.user.Logo ? user.user.Logo : logo"
						alt="user avatar"
					/>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-menu>
			<div class="row no-wrap q-pa-md">
				<q-list separator>
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
						<img
							:src="user.user.Logo ? user.user.Logo : logo"
							alt="user avatar"
						/>
					</q-avatar>

					<div class="q-mt-md q-mb-xs">
						Hi, {{ user.user.FirstName }} {{ user.user.LastName }}
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LangSwitcher from "components/LangSwitcher.vue";
import profilImg from "src/assets/profil.png";

export default {
	components: { LangSwitcher },
	props: {
		logo: {
			type: String,
			default: profilImg,
		},
	},
	setup() {
		const store = useStore();
		const router = useRouter();

		const logout = () => {
			store.dispatch("auth/logout");
			router.push("/login");
		};

		return {
			user: store.getters["auth/currentUser"],
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
