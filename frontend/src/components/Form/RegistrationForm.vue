<template>
	<div class="q-pa-md" style="width: 400px">
		<Headline6>Register</Headline6>
		<q-form @submit.prevent="register" class="q-gutter-md">
			<q-input
				filled
				v-model="name"
				label="Enter your Name *"
				lazy-rules
				:rules="[(val) => (val && val.length > 0) || 'Please type something']"
			/>
			<q-input
				filled
				v-model="email"
				label="Enter your Email *"
				lazy-rules
				:rules="[(val) => !!val || 'Email is missing']"
			/>
			<q-input
				label="Enter your Password *"
				v-model="password"
				filled
				:type="isPwd ? 'password' : 'text'"
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
			<router-link to="/login"> Already have an account? Login. </router-link>
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

export default {
	components: { Headline6 },
	setup() {
		const router = useRouter();
		const $q = useQuasar();
		const store = useStore();
		const name = ref(null);
		const email = ref(null);
		const password = ref(null);
		const errors = ref(null);
		const isPwd = ref(false);

		return {
			name,
			email,
			password,
			errors,
			isPwd,

			register() {
				$q.notify({
					color: "green-4",
					textColor: "white",
					icon: "cloud_done",
					message: "Submitted successfully",
				});
				const newUser = {
					name: name.value,
					email: email.value,
					password: password.value,
				};
				store
					.dispatch("auth/register", newUser)
					.then(() => {
						router.push("/login");
					})
					.catch((err) => {
						errors.value = err.response.data.errors;
					});

				name.value = null;
				email.value = null;
				password.value = null;
			},
		};
	},
};
</script>
