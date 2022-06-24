import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useEnvironmentsTabsData(props) {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const usersList = ref([]);
	const roleList = ref([]);
	const environmentTeam = ref(props.teamEnvironnements);
	const environmentName = ref("");
	const environmentShortDescription = ref("");
	const environmentDescription = ref("");
	const optionsSelections = ref(null);
	const selectedParentData = ref(null);
	const environmentTypeNameRef = ref(null);

	const getUsersList = async () => {
		await store.dispatch("appUsers/fetchUsers");
		const list = computed(() => store.getters["appUsers/allUsers"]);
		usersList.value = list.value.map((user) => {
			return {
				id: user.ID,
				firstName: user.FirstName,
				lastName: user.LastName,
				email: user.Email,
				label: user.FirstName + " " + user.LastName,
				value: user.FirstName + " " + user.LastName,
				logo: user.Logo,
				description: user.Description,
			};
		});
	};
	getUsersList();

	const getRolesList = async () => {
		await store.dispatch("appRoles/fetchAllRoles");
		const roles = computed(() => store.getters["appRoles/allRoles"]);
		roleList.value = roles.value.map((role) => {
			return {
				id: role.ID,
				name: role.Name,
				label: role.Name,
				value: role.Name,
				logo: role.Logo,
				shortDescription: role.ShortDescription,
				description: role.Description,
			};
		});
	};
	getRolesList();

	const refreshData = async () => {
		await store.dispatch(
			"appDomain/fetchDomainById",
			route.currentRoute.value.params.id
		);
		let data = computed(() => {
			return store.getters["appDomain/allDomaines"];
		});
		environmentTeam.value = data.value[0].Environments;
	};

	const deleteEnvironement = async (id) => {
		await store.dispatch("appEnvironment/removeEnvironment", id);
		refreshData();
	};

	const confirmDeleteEnvironment = (item) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				deleteEnvironement(item);
			})
			.onCancel(() => {
			});
	};

	const addNewEnvironment = async () => {
		let newEnvironment = {
			domainID: route.currentRoute.value.params.id,
			environmentTypeID: selectedParentData.value.id,
			environmentTypeName: selectedParentData.value.name,
			name: environmentName.value,
			shortDescription: environmentShortDescription.value,
			description: environmentDescription.value,
		};
		try {
			await store
				.dispatch("appEnvironment/addEnvironment", newEnvironment)
				.then(() => {
					refreshData();
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${environmentName.value} environment was succefuly created`,
					});
				});

		} catch (error) {
			$q.notify({
				type: "negative",
				message: `${environmentName.value} environment was not created`,
			});
		}
		selectedParentData.value = "";
		environmentName.value = "";
		environmentShortDescription.value = "";
		environmentDescription.value = "";
	};

	const getAllEnviTypes = async () => {
		await store.dispatch("appEnviType/fetchAllEnviTypes");
		const allEnviTypes = computed(
			() => store.getters["appEnviType/allEnviTypes"]
		);
		// Get input Select options value

		let dataReturned = allEnviTypes.value.map((payload) => {
			return {
				id: payload.ID,
				name: payload.Name,
				label: payload.Name,
				value: payload.Name,
				parentName: payload?.Name,
				shortDescription: payload.ShortDescription,
				description: payload.Description,
				logo: payload.Logo,
			};
		});

		optionsSelections.value = [...new Set(dataReturned)].filter(
			(item) => item != null
		);
	};
	getAllEnviTypes();

	const addNewAuthorization = async () => {
		const newAuthorization = {
			// userID: pickedUsers.value.User.ID,
			// roleID: pickedRole.value.Role.ID,
		};
		// await store.dispatch("appAuthorization/addAuthorization", newAuthorization )
	};
	addNewAuthorization();

	return {
		store,
		route,
		$q,
		usersList,
		getUsersList,
		roleList,
		getRolesList,
		environmentTeam,
		environmentName,
		selectedParentData,
		environmentShortDescription,
		environmentDescription,
		optionsSelections,
		environmentTypeNameRef,
		deleteEnvironement,
		confirmDeleteEnvironment,
		addNewEnvironment,
		getAllEnviTypes,
		addNewAuthorization,
	};
}
