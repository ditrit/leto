import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default function useContentCardData() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();

	const refreshDomain = async (id, domainNewData) => {
		await store.dispatch("appDomain/fetchDomainById", id);
		let data = computed(() => store.getters["appDomain/allDomaines"]);
		domainNewData = await data.value;
		console.log("	Refresh domainNewData.value: ", domainNewData);
	};
	return { store, route, $q, refreshDomain };
}
