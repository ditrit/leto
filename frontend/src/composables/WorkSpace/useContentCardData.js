import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default function useContentCardData() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();

	const refreshDomainData = async (id, domainData) => {
		await store.dispatch("appDomain/fetchDomainById", id);
		let data = computed(() => store.getters["appDomain/allDomaines"]);
		domainData = Object.values(data.value).map((item) => {
			return {
				id: item.ID,
				name: item.Name,
				shortDescription: item.ShortDescription,
				description: item.Description,
				logo: item.Logo,
				tags: item.Tags,
				products: item.Products,
				envirnments: item.Environments,
				authorizations: item.Authorizations,
				libraries: item.Libraries,
				gitURL: item.GitURL,
				parentID: item.ParentID,
			};
		});
	};
	return { store, route, $q, refreshDomainData };
}
