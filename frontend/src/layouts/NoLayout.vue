<template>
	<q-layout view="lhh lpR fFf" class="bg-gray">
		<q-page padding>
			<q-header reveal class="bg-white text-primary">
				<q-toolbar class="justify-between">
					<div class="row">
						<q-list class="row rounded-borders">
							<q-item>
								<router-link
									class="text-primary text-weight-medium"
									to="/signin"
								>
									Sign in
								</router-link>
							</q-item>
							<div class="row" v-if="authenticated">
								<q-item>
									<router-link
										class="text-primary text-weight-medium"
										to="/home"
									>
										Home
									</router-link>
								</q-item>

								<q-item>
									<router-link
										class="text-primary text-weight-medium"
										to="/dash"
									>
										Dashboard
									</router-link>
								</q-item>
								<q-item>
									<router-link class="text-primary text-weight-medium" to="#">
										Sign out
									</router-link>
								</q-item>
							</div>
						</q-list>
					</div>
					<global-search />
					<AccountSettings />
				</q-toolbar>
			</q-header>

			<q-page-container class="bg-gray">
				<router-view />
			</q-page-container>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, computed } from "vue";

import { useStore } from "vuex";
import AccountSettings from "../components/Profil/AccountSettings.vue";

export default defineComponent({
	name: "NoLayout",
	components: {
		AccountSettings,
	},

	setup() {
		const store = useStore();
		const authenticated = computed(() => {
			return store.getters["auth/authenticated"];
		});
		return {
			authenticated,
		};
	},
});
</script>
<style lang="sass">
.full_height
	height: inherit

.width_19
	width: 19%

.centered
	display: flex
	align-items: center
	flex-direction: column
	justify-content: center
	box-sizing: border-box
	overflow-x: hidden
</style>
