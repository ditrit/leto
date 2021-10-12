<template>
	<div class="profil_settings" style="z-index: 2">
		<q-item clickable>
			<q-item-section>
				<q-avatar round size="40px">
					<img src="../../../assets/profil.png" />
					<!-- <q-badge floating rounded color="orange">4</q-badge> -->
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-menu>
			<div class="row no-wrap q-pa-md">
				<q-list separator>
					<q-item clickable v-ripple>
						<q-item-section>Link One</q-item-section>
					</q-item>

					<q-item clickable v-ripple>
						<q-item-section>
							<q-item-label>Link Two</q-item-label>
							<q-item-label caption>Caption</q-item-label>
						</q-item-section>
					</q-item>

					<q-item clickable v-ripple>
						<q-item-section>
							<q-item-label>Link Three</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>

				<q-separator vertical inset class="q-mx-lg" />

				<div class="column" v-if="user">
					<q-avatar size="72px">
						<img src="../../../assets/profil.png" />
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
export default {
	setup() {
		const store = useStore();
		const router = useRouter();

		const user = ref(null);
		user.value = store.getters["auth/user"];

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
<style lang="sass">
.profil_settings
	position: absolute
	right: 20px
</style>
