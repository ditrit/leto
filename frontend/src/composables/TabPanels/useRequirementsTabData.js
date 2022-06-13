import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useRequirementsTabData() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();



	return {
		store,
		route,
		$q,
	};
}
