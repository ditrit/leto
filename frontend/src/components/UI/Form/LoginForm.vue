<template>
	<div class="q-pa-md text-center" style="width: 400px">
		<Headline6>Login</Headline6>
		<q-form @submit.prevent="login" class="q-gutter-sm">
			<q-input
				filled
				v-model="email"
				label="Email *"
				lazy-rules
				:rules="[(val) => !!val || 'Email is missing']"
			/>
			<q-input
				label="Password *"
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
			<router-link to="/register" class="block text-grey-6">
				Don't have an account? Register.
			</router-link>
			<p class="text-red">{{ error }}</p>
		</q-form>
	</div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Headline6 from "../Headlines/Headline6";

export default {
	components: { Headline6 },
	setup() {
		const isPwd = ref(false);
		const router = useRouter();
		const $q = useQuasar();
		const store = useStore();
		const email = ref(null);
		const password = ref(null);
		const error = ref(null);

		return {
			email,
			password,
			error,
			isPwd,

			login() {
				const newUser = {
					email: email.value,
					password: password.value,
				};
				console.log("newUser: ", newUser);
				store.dispatch("auth/login", newUser).then(() => {
					$q.notify({
						color: "green-4",
						textColor: "white",
						icon: "cloud_done",
						message: "Submitted successfully",
					});

					store.dispatch("auth/currentUser");
					router.push("/dashboard");
				}).catch(() => {
					$q.notify({
						color: "negative",
						textColor: "white",
						icon: "error",
						message: "Sorry,you can not login",
					});
				});
			},
		};
	},
};
</script>
