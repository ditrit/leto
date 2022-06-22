import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useSubworkspaceTabData(props) {
	const store = useStore();
	const route = useRouter();
	const quasar = useQuasar();
	const subworkspaceId = ref(props.id);
	const workspaceSubworkspaces = ref(null);
	const subworkspaceName = ref(props.name);
	const subworkspaceLogo = ref(props.logo);
	const subworkspaceShortDescription = ref(props.shortDescription);
	const subworkspaceDescription = ref(props.description);
	const subworkspaceRepositoryURL = ref(props.repositoryURL);
	const subworkspaceParentID = ref(route.currentRoute.value.params.id);

	const getSubworkspaces = async () => {
		await store.dispatch("appDomain/fetchDomainesTree");
		let data = store.getters["appDomain/allDomainesTree"];
		workspaceSubworkspaces.value = [...data.Childs];
	};
	getSubworkspaces();

	const refreshSubworkspaces = async (id, updatesData) => {
		await store.dispatch("appDomain/fetchDomainById", id);
		await store.getters["appDomain/fetchAllDomaines"];
		subworkspaceName.value = updatesData.Name;
		subworkspaceLogo.value = updatesData.Logo;
		subworkspaceShortDescription.value = updatesData.ShortDescription;
		subworkspaceRepositoryURL.value = updatesData.GitURL;
		subworkspaceDescription.value = updatesData.Description;
		subworkspaceParentID.value = updatesData.DomainID;
	};

	const confirmDeleteSubworkspace = (id) => {
		quasar
			.dialog({
				title: "Confirm",
				message: "Are you sure to delete this item?",
				cancel: true,
				persistent: true,
			})
			.onOk(() => {
				deleteSubworkspace(id);
			});
	};

	const deleteSubworkspace = async (subworkspace) => {
		try {
			store.dispatch("appDomain/removeDomain", `${subworkspace}`);
			getSubworkspaces();
			quasar.notify({
				type: "positive",
				message: `Workspace was succefully deleted`,
			});
		} catch (error) {
			quasar.notify({
				type: "negative",
				message: `Error while deleting workspace`,
			});
		}
	};
	const addNewSubworkspace = () => {
		let newSubworkspace = {
			pid: route.currentRoute.value.params.id,
			Name: subworkspaceName.value,
			Logo: subworkspaceLogo.value,
			ShortDescription: subworkspaceShortDescription.value,
			Description: subworkspaceDescription.value,
		};
		try {
			store.dispatch("appDomain/addDomain", newSubworkspace);
			getSubworkspaces();
			quasar.notify({
				type: "positive",
				message: `${subworkspaceName.value} subworkspace was successfully created`,
			});
		} catch (error) {
			quasar.notify({
				type: "negative",
				message: `${subworkspaceName.value} subworkspace was not created`,
			});
		}
		subworkspaceName.value = "";
		subworkspaceLogo.value = "";
		subworkspaceShortDescription.value = "";
		subworkspaceDescription.value = "";
	};

	const updateSubworkspace = () => {
		let updates = {
			ID: props.id,
			ParentID: subworkspaceParentID.value,
			Name: subworkspaceName.value,
			Logo: subworkspaceLogo.value,
			ShortDescription: subworkspaceShortDescription.value,
			GitURL: subworkspaceRepositoryURL.value,
			Description: subworkspaceDescription.value,
		};
		try {
			store.dispatch("appDomain/updateDomain", updates).then(() => {
				refreshSubworkspaces(updates.ID, updates);
			});
			quasar.notify({
				type: "positive",
				message: `${updates.Name} subworkspace was successfully updated`,
			});
		} catch (error) {
			quasar.notify({
				type: "negative",
				message: `Error while updating ${subworkspaceName.value}`,
			});
		}
	};

	return {
		store,
		route,
		quasar,
		subworkspaceId,
		workspaceSubworkspaces,
		subworkspaceName,
		subworkspaceLogo,
		subworkspaceShortDescription,
		subworkspaceDescription,
		subworkspaceRepositoryURL,
		subworkspaceParentID,
		deleteSubworkspace,
		confirmDeleteSubworkspace,
		addNewSubworkspace,
		updateSubworkspace,
		getSubworkspaces,
	};
}
