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
	const selectedParentData = ref(null);
	const environmentShortDescription = ref("");
	const environmentDescription = ref("");
	const optionsSelections = ref(null);

	const getUsersList = async () => {
		await store.dispatch("appUsers/fetchUsers");
		const list = computed(() => store.getters["appUsers/allUsers"]);
		console.log("Users list: ", list.value);
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
	console.log("usersList.value: ", usersList.value);

	const getRolesList = async () => {
		await store.dispatch("appRoles/fetchAllRoles");
		const roles = computed(() => store.getters["appRoles/allRoles"]);
		console.log("Roles list: ", roles.value);
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
		console.log('"data from refreshData: ": ', data.value);
		console.log("data.value[0].Environments: ", data.value[0].Environments);
		console.log(
			"	route.currentRoute.value.params.id: ",
			route.currentRoute.value.params.id
		);
		environmentTeam.value = data.value[0].Environments;
	};

	const deleteEnvironement = async (evironment) => {
		await store.dispatch("appEnvironment/removeEnvironment", evironment.id);
		refreshData();
	};

	const confirmDeleteEnvironment = (props) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				deleteEnvironement(props);
			})
			.onCancel(() => {
				console.log("Cancel");
			});
	};

	const addNewEnvironment = async () => {
		console.log("selectedParentData", selectedParentData.value);
		let newEnvironment = {
			domainID: route.currentRoute.value.params.id,
			environmentTypeID: selectedParentData.value.id,
			environmentTypeName: selectedParentData.value.name,
			name: environmentName.value,
			shortDescription: environmentShortDescription.value,
			description: environmentDescription.value,
		};
		console.log("newEnvironment: ", newEnvironment);
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

			console.log("environmentTeam from useTabs:", environmentTeam.value);
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

	const updateEnvironement = async (evironment) => {
		await store
			.dispatch("appEnvironment/updateEnvironment", evironment)
			.then(() => {
				refreshData();
			})
			.then(() => {
				$q.notify({
					type: "positive",
					message: `${environmentName.value} environment was succefuly updated`,
				});
			});
		console.log("Update evironment from useTabs: ", evironment);
	};

	const getAllEnviTypes = async () => {
		await store.dispatch("appEnviType/fetchAllEnviTypes");
		const allEnviTypes = computed(
			() => store.getters["appEnviType/allEnviTypes"]
		);
		console.log("allEnviTypes: ", allEnviTypes.value);
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
		console.log("dataReturned from form: ", [...dataReturned]);

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

		console.log("newAuthorization: ", newAuthorization);
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
		deleteEnvironement,
		confirmDeleteEnvironment,
		addNewEnvironment,
		updateEnvironement,
		updateEnvironement,
		getAllEnviTypes,
		addNewAuthorization,
	};
}
