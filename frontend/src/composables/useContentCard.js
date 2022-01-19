import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default function useContentCardData() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();

	const refreshDomainEnvironments = async (id, domainEnvironments) => {
		await store.dispatch("appDomain/fetchDomainById", id);
		let data = computed(() => store.getters["appDomain/allDomaines"]);
		domainEnvironments = await data.value[0].Environments;
		console.log("	Refresh domainEnvironments: ", domainEnvironments);
	};
	return { store, route, $q, refreshDomainEnvironments };
}
