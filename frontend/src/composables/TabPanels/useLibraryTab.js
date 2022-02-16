import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useLibraryTabData(props) {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const libraryTeam = ref(props.teamLibraries);
	const libraryName = ref("");
	const libraryShortDescription = ref("");
	const libraryDescription = ref("");

	const refreshData = async () => {
		await store.dispatch(
			"appDomain/fetchDomainById",
			route.currentRoute.value.params.id
		);
		let data = computed(() => {
			return store.getters["appDomain/allDomaines"];
		});
		console.log('"data from refreshData: ": ', data.value);
		console.log("data.value[0].Libraries: ", data.value[0].Libraries);
		console.log(
			"	route.currentRoute.value.params.id: ",
			route.currentRoute.value.params.id
		);
		libraryTeam.value = data.value[0].Libraries;
	};

	const deleteLibrary = async (id) => {
		await store
			.dispatch("appLibraries/removeLibrary", `${id}`)
			.then(() => refreshData());
	};

	const confirmDeleteLibrary = (id) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				deleteLibrary(id);
			})
			.onCancel(() => {
				console.log("Cancel");
			});
	};

	const addNewLibrary = async (libID) => {
		let newLibrary = {
			domainId: route.currentRoute.value.params.id,
			libraryId: libID,
		};
		console.log("libID: ", libID);
		console.log("newLibrary: ", newLibrary);
		try {
			await store
				.dispatch("appDomain/addDomainLibrary", newLibrary)
				.then(() => {
					refreshData();
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${libraryName.value} library was succefuly created`,
					});
				});

			console.log("libraryTeam from useTabs:", libraryTeam.value);
		} catch (error) {
			$q.notify({
				type: "negative",
				message: `${libraryName.value} library was not created`,
			});
		}

		libraryName.value = "";
		libraryShortDescription.value = "";
		libraryDescription.value = "";
	};

	const updateLibrary = async (id) => {
		let library = {
			id: id,
			name: libraryName.value,
			shortDescription: libraryShortDescription.value,
			description: libraryDescription.value,
			domainID: route.currentRoute.value.params.id,
		};

		await store
			.dispatch("appLibraries/updateLibrary", library)
			.then(() => {
				refreshData();
			})
			.then(() => {
				$q.notify({
					type: "positive",
					message: `${libraryName.value} library was succefuly updated`,
				});
			});
		console.log("Update library from useTabs: ", library);
	};

	return {
		store,
		route,
		$q,
		libraryTeam,
		libraryName,
		libraryShortDescription,
		libraryDescription,
		deleteLibrary,
		confirmDeleteLibrary,
		addNewLibrary,
		updateLibrary,
	};
}
