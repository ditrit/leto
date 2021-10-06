<template>
	<div class="q-pa-md text-center" style="width: 400px">
		<Headline6>Register</Headline6>
		<q-form @submit.prevent="register" class="q-gutter-sm">
			<q-input
				filled
				v-model="firstName"
				label="First name *"
				lazy-rules
				:rules="[
					(val) =>
						(val && val.length > 2) || 'Please type minimum 3 characters',
				]"
			/>
			<q-input
				filled
				v-model="lastName"
				label="Last name *"
				lazy-rules
				:rules="[
					(val) =>
						(val && val.length > 2) || 'Please type minimum 3 characters',
				]"
			/>
			<q-input
				filled
				v-model="email"
				label="Email *"
				lazy-rules
				:rules="[(val) => !!val || 'Email is missing', emailValidation]"
			/>
			<q-input
				label="Password *"
				v-model="password"
				filled
				:type="isPwd ? 'password' : 'text'"
				:rules="[(val) => val.length >= 8 || 'Please use minimum 8 characters']"
			>
				<template v-slot:append>
					<q-icon
						:name="isPwd ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isPwd = !isPwd"
					/>
				</template>
			</q-input>

			<div>
				<q-btn
					label="Submit"
					type="submit"
					color="primary"
					class="full-width q-mt-md"
					padding="lg"
				/>
			</div>
			<router-link to="/login" class="block text-grey-7">
				Already have an account? Login.
			</router-link>
			<ul>
				<li v-for="(error, index) in errors" :key="index">
					{{ error }}
				</li>
			</ul>
		</q-form>
	</div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Headline6 from "../Ui/Headlines/Headline6.vue";
import { emailValidation } from "../../common";

export default {
	components: { Headline6 },
	setup() {
		const router = useRouter();
		const $q = useQuasar();
		const store = useStore();
		const firstName = ref(null);
		const lastName = ref(null);
		const email = ref(null);
		const password = ref(null);
		const errors = ref(null);
		const isPwd = ref(false);

		return {
			firstName,
			lastName,
			email,
			password,
			errors,
			isPwd,
			emailValidation,

			register() {
				const newUser = {
					firstName: firstName.value,
					lastName: lastName.value,
					email: email.value,
					password: password.value,
				};
				store
					.dispatch("auth/register", newUser)
					.then(() => {
						router.push("/login");
					})
					.then(() => {
						$q.notify({
							color: "green-4",
							textColor: "white",
							icon: "cloud_done",
							message: "Submitted successfully",
						});
					})
					.catch((err) => {
						errors.value = err.response.data.errors;
						$q.notify({
							color: "red-4",
							textColor: "white",
							icon: "error",
							message: errors.value,
						});
					});
			},
		};
	},
};
</script>
