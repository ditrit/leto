<template>
	<div class="fixed-top-right q-mr-lg q-pa-md" style="max-width: 350px">
		<q-list class="row rounded-borders">
			<q-item>
				<router-link class="text-primary text-weight-medium" to="/login">
					Login
				</router-link>
			</q-item>

			<q-item>
				<router-link class="text-primary text-weight-medium" to="/register">
					Register
				</router-link>
			</q-item>
		</q-list>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	setup() {
		return {
			tab: ref("login"),
		};
	},
};
</script>

<style lang="sass">
a
  text-decoration: none !important
a:active
  color: green !important
</style>
