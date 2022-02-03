import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useAuthorizationsTabsData(props) {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const usersList = ref([]);
	const roleList = ref([]);
	const domainList = ref([]);
	const optionsSelections = ref([]);
	const selectedParentData = ref([]);
	const authorizationIdRef = ref(props.authorizationId);
	const authorizationRoleRef = ref(props.authorizationRole);
	const authorizationRoleIDRef = ref(props.authorizationRoleID);
	const authorizationUserIDRef = ref(props.authorizationUserID);
	const authorizationRoleNameRef = ref(props.authorizationRoleName);
	const authorizationNameRef = ref(props.authorizationName);
	const authorizationLogoRef = ref(props.authorizationLogo);
	const authorizationShortDescriptionRef = ref(
		props.authorizationShortDescription
	);
	const authorizationDescriptionRef = ref(props.authorizationDescription);
	const authorizationDomainIDRef = ref(props.authorizationDomainID);
	const authorizationDomainNameRef = ref(props.authorizationDomainName);
	const domainListNames = ref([]);
	const opendEditAuthorizationDialog = ref(false);
	const openAddAuthorizationDialog = ref(false);

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

	const getDomainName = async () => {
		await store.dispatch("appDomain/fetchAllDomaines");
		let domains = store.getters["appDomain/allDomaines"];

		domainList.value = domains.map((domain) => {
			return {
				domainId: domain.ID,
				label: domain.Name,
				name: domain.Name,
				value: domain.Name,
			};
		});

		let index = domains.find(
			(domain) => domain.ID === authorizationDomainIDRef.value
		);

		return (authorizationDomainNameRef.value = index.Name);
	};
	getDomainName();

	// const refreshData = async () => {
	// 	await store.dispatch(
	// 		"appDomain/fetchDomainById",
	// 		route.currentRoute.value.params.id
	// 	);
	// 	let data = computed(() => {
	// 		return store.getters["appDomain/allDomaines"];
	// 	});
	//
	//
	// 	console.log(
	// 		"	route.currentRoute.value.params.id: ",
	// 		route.currentRoute.value.params.id
	// 	);
	// 	environmentTeam.value = data.value[0].Environments;
	// };

	const deleteAuthorization = async (evironment) => {
		await store.dispatch("appEnvironment/removeEnvironment", evironment.id);
		// refreshData();
	};

	const confirmDeleteAuthorization = (props) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				deleteAuthorization(props);
			})
			.onCancel(() => {});
	};

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
		domainList,
		getRolesList,
		selectedParentData,
		optionsSelections,
		addNewAuthorization,
		confirmDeleteAuthorization,
		authorizationIdRef,
		authorizationNameRef,
		authorizationLogoRef,
		authorizationShortDescriptionRef,
		authorizationDescriptionRef,
		authorizationDomainIDRef,
		authorizationRoleRef,
		authorizationRoleNameRef,
		authorizationRoleIDRef,
		authorizationUserIDRef,
		authorizationDomainNameRef,
		domainListNames,
		opendEditAuthorizationDialog,
		openAddAuthorizationDialog,
	};
}
