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
import Headline6 from "../Headlines/Headline6";
import useLoginData from "../../../composables/Forms/useLogin";

export default {
	components: { Headline6 },
	setup() {
		let { isPwd, email, password, error, login } = useLoginData();

		const login = async () => {
			const newUser = {
				email: email.value,
				password: password.value,
			};
			console.log("newUser: ", newUser);
			await store
				.dispatch("auth/login", newUser)
				.then(() => {
					$q.notify({
						color: "green-4",
						textColor: "white",
						icon: "cloud_done",
						message: "Login successfully",
					});
				})
				.then(() => {
					router.push("/dashboard");
				})
				.catch(() => {
					$q.notify({
						color: "negative",
						textColor: "white",
						icon: "error",
						message: "Sorry,you can not login",
					});
				});
		};

		return {
			email,
			password,
			error,
			isPwd,
			login,
		};
	},
};
</script>
