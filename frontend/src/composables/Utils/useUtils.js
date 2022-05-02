import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import API from "../../services/index";

export default function useUtils() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	return { store, route, $q, API };
}
