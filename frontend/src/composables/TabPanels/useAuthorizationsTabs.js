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
	const opendEditAuthorizationDialog = ref(false);
	const openAddAuthorizationDialog = ref(false);
	const authorizationDomainObj = ref(props.teamMembers);

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

	const refreshAuthorizationTab = async () => {
		await store.dispatch(
			"appDomain/fetchDomainById",
			route.currentRoute.value.params.id
		);
		let domain = store.getters["appDomain/allDomaines"];
		let choosenDomain = domain.find(
			(d) => d.ID === route.currentRoute.value.params.id
		);
		return (authorizationDomainObj.value = Object.values(choosenDomain)[7]);
	};
	refreshAuthorizationTab();
	console.log("authorizationDomainObj.value: ", authorizationDomainObj.value);

	const deleteAuthorization = async (id) => {
		await store
			.dispatch("appAuthorization/removeAuthorization", id)
			.then(() => {
				refreshAuthorizationTab();
			});
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
			.onCancel(() => {
				console.log("canceled");
			});
	};

	return {
		store,
		route,
		$q,
		usersList,
		roleList,
		getUsersList,
		getRolesList,
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
		opendEditAuthorizationDialog,
		openAddAuthorizationDialog,
		authorizationDomainObj,
	};
}
