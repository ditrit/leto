<template>
	<div class="q-pa-md" style="width: 400px">
			<Headline6>Login</Headline6>
		<q-form @submit="onSubmit" class="q-gutter-md">
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
		</q-form>
	</div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Headline6 from '../Ui/Headlines/Headline6';

export default {
	components: { Headline6 },
	setup() {
		const $router = useRouter();
		const $q = useQuasar();
		const store = useStore();
		const email = ref(null);
		const password = ref(null);

		return {
			email,
			password,

			onSubmit() {
				$q.notify({
					color: "green-4",
					textColor: "white",
					icon: "cloud_done",
					message: "Submitted successfully",
				});
				const newUser = {
					email: email.value,
					password: password.value,
				};

				// store.dispatch("appUsers/logInUser", newUser);
				store.dispatch("auth/signIn", newUser);
				$router.push("/dashboard");

				email.value = null;
				password.value = null;
			},
		};
	},
};
</script>
