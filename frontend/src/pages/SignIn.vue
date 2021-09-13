<template>
	<div>
		<h6>Sign in Page</h6>
		<p>user informations: {{ authenticated }}</p>

		<form @submit.prevent="handleSubmit" class="flex column">
			<input type="text" name="name" placeholder="Name" v-model="user.name" />
			<input
				type="text"
				name="email"
				placeholder="Email"
				v-model="user.email"
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				v-model="user.password"
			/>
			<button type="submit">Send</button>
		</form>
	</div>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
	name: "signIn",
	setup() {
		const store = useStore();
		const router = useRouter();
		const user = reactive({ name: "", email: "", password: "" });
		const handleSubmit = async () => {
			return store
				.dispatch("auth/signIn", user)
				.then(router.push("/dash"))
				.catch((error) => console.log(error));
		};

		const authenticated = computed(() => {
			return store.getters["auth/authenticated"];
		});
		return { handleSubmit, user, authenticated };
	},
};
</script>

<style></style>
