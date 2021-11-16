<template>
	<q-container class="text-primary full-width min_heigth__600">
		<q-tabs
			v-model="tab"
			class="text-grey"
			active-color="primary"
			indicator-color="primary"
			align="center"
			narrow-indicator
		>
			<q-tab name="login" label="Log in" />
			<q-tab name="register" label="Register" />
		</q-tabs>
		<q-tab-panels v-model="tab" animated align="center">
			<q-tab-panel name="login">
				<LoginForm />
			</q-tab-panel>

			<q-tab-panel name="register">
				<RegistrationForm />
				<SocialConnect />
			</q-tab-panel>
		</q-tab-panels>
	</q-container>
</template>

<script>
import { ref } from "vue";
import LoginForm from "../UI/Form/LoginForm.vue";
import RegistrationForm from "../UI/Form/RegistrationForm";
import SocialConnect from "../Login/SocialConnect.vue";
export default {
	components: { LoginForm, RegistrationForm, SocialConnect },
	setup() {
		return {
			tab: ref("login"),
			socialLogin: () => alert("Ready to connect"),
		};
	},
};
</script>

<style lang="sass">
.q-tab
  color: grey
.min_heigth__600
  min-height: 700px
</style>
