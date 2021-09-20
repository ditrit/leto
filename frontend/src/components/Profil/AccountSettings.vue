<template>
	<div class="">
		<q-item clickable>
			<q-item-section>
				<q-avatar round size="40px">
					<img src="../../assets/profil.png" />
					<q-badge floating rounded color="orange">4</q-badge>
				</q-avatar>
			</q-item-section>
		</q-item>
		<q-menu>
			<div class="row no-wrap q-pa-sm">
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
							<q-item-label overline>OVERLINE</q-item-label>
							<q-item-label>Link Three</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>

				<q-separator vertical inset class="q-mx-lg" />

				<div class="column" v-for="item in authenticated" :key="item.id">
					<q-avatar size="72px">
						<img src="../../assets/profil.png" />
					</q-avatar>

					<div class="q-mt-md q-mb-xs">Hi Brahim</div>

					<q-btn
						color="primary"
						label="Logout"
						push
						size="sm"
						v-close-popup
						@click.prevent="logout"
					/>
				</div>
			</div>
		</q-menu>
	</div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
	setup() {
		const store = useStore();
		const router = useRouter();
		const authenticated = computed(() => {
			return store.getters["auth/loggedIn"];
		});

		const logout = () => {
			store.dispatch("auth/logout");
			router.push("/login");
		};

		const getName = () => {
			let name = Object.values(authenticated.value);
			return name;
		};

		console.log(authenticated.value);
		console.log("getName: ", getName.value);
		return {
			authenticated,
			logout,
			getName,
		};
	},
};
</script>
<style lang="sass"></style>
