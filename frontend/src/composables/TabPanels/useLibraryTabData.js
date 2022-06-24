import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import API from "../../services/index";

export default function useLibraryTabData(props) {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const libraryTeam = ref(props.teamLibraries);
	const librariesList = ref([]);
	const libraryId = ref("");
	const libraryName = ref("");
	const domainID = ref(route.currentRoute.value.params.id);
	const libraryShortDescription = ref("");
	const libraryDescription = ref("");

	const getLibrariesList = async () => {
		await store.dispatch("appLibraries/fetchAllLibraries");
		const libraries = computed(
			() => store.getters["appLibraries/allLibraries"]
		);
		librariesList.value = libraries.value.map((library) => {
			return {
				id: library.ID,
				name: library.Name,
				label: library.Name,
				value: library.Name,
				logo: library.Logo,
				shortDescription: library.ShortDescription,
				description: library.Description,
			};
		});
	};
	getLibrariesList();

	const refreshData = async () => {
		await store.dispatch("appDomain/fetchDomainById", domainID.value);
		let data = computed(() => {
			return store.getters["appDomain/allDomaines"];
		});

		libraryTeam.value = data.value[0].Libraries;
	};

	const deleteLibrary = async (id) => {
		API.delete(`/domain/${domainID.value}/library/${id}`).then(() =>
			refreshData()
		);
	};

	const confirmDeleteLibrary = (item) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				deleteLibrary(item);
			})
			.onCancel(() => {
			});
	};

	const addNewLibrary = async () => {
		let newLibrary = {
			domainId: domainID.value,
			libraryId: libraryName.value.id,
		};
		try {
			await store
				.dispatch("appDomain/addDomainLibrary", newLibrary)
				.then(() => {
					refreshData();
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${libraryName.value.name} library was succefuly created`,
					});
				});
		} catch (error) {
			$q.notify({
				type: "negative",
				message: `${libraryName.value.name} library was not created`,
			});
		}
	};

	return {
		store,
		route,
		$q,
		librariesList,
		libraryId,
		libraryName,
		libraryShortDescription,
		libraryDescription,
		deleteLibrary,
		confirmDeleteLibrary,
		addNewLibrary,
		libraryTeam,
		domainID,
	};
}
