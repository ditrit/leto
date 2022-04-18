import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useLoginbData() {
	const router = useRouter();
	const store = useStore();
	const $q = useQuasar();
	const isPwd = ref(true);
	const email = ref(null);
	const password = ref(null);

	const login = async () => {
		const newUser = {
			email: email.value,
			password: password.value,
		};
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
		isPwd,
		router,
		$q,
		store,
		email,
		password,
		login,
	};
}
