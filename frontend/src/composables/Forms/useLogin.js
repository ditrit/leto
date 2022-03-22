import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useLoginbData() {
	const isPwd = ref(true);
	const router = useRouter();
	const $q = useQuasar();
	const store = useStore();
	const email = ref(null);
	const password = ref(null);
	const error = ref(null);

	return {
		isPwd,
		router,
		$q,
		store,
		email,
		password,
		error,
	};
}
