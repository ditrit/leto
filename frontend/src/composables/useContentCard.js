import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default function useContentCardData() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();

	const getDomainstree = async () => {
		await store.dispatch("appDomain/fetchDomainesTree");
		return store.getters["appDomain/allDomainesTree"];
	};

	return { store, route, $q, getDomainstree };
}
