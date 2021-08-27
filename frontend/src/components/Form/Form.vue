<template>
	<div class="q-pa-md" style="max-width: 400px">
		<q-form @submit="onSubmit" class="q-gutter-md">
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
		</q-form>
	</div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";

export default {
	setup() {
		const $q = useQuasar();
		const name = ref(null);
		const email = ref(null);
		const password = ref(null);

		return {
			name,
			email,
			password,

			onSubmit() {
				$q.notify({
					color: "green-4",
					textColor: "white",
					icon: "cloud_done",
					message: "Submitted successfully",
				});

				// alert(JSON.stringify({"your name: ": name.value, "your email: " : email.value}))
				alert(
					`
                Thank four Sign in 😄

                Your Name:  ${name.value}
                Your Email : ${email.value}
                Your Password : ${password.value}
              `
				);
				axios.post("http://127.0.0.1:9203/ditrit/Gandalf/1.0.0/user", {
					name: name.value,
					email: email.value,
					password: password.value,
				});
			},
		};
	},
};
</script>
