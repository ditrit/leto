import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import API from "../../services/index";

export default function useDomainData(props) {
	const store = useStore();
	const $q = useQuasar();
	const route = useRouter();
	const menu = ref(null);
	const choosenNodeID = ref("");
	const editMode = ref(false);
	const currentDomainDataContent = ref(null);
	const progress = ref(null);
	const domainTags = ref([]);
	const globalTagsTreeList = ref([]);
	const domainID = ref(props.id);

	const goToID = async (node) => {
		choosenNodeID.value = node.id;
		console.log("goToID node.id: ", node.id);
		console.log("goToID choosenNodeID.value: ", choosenNodeID.value);
		editMode.value = false;
		route.push(`/workspaces/${choosenNodeID.value}`);
		const rigthData = async () => {
			await store.dispatch(
				"appDomain/fetchDomainById",
				`${choosenNodeID.value}`
			);
			let data = await store.getters["appDomain/allDomaines"];
			console.log(
				"data from rigthData: ",
				Object.values(data).filter(
					(domain) => domain.ID === choosenNodeID.value
				)
			);
			progress.value = data.length;

			currentDomainDataContent.value = Object.values(data).map((item) => {
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
			console.log(
				"currentDomainDataContent from rigthData: ",
				currentDomainDataContent.value
			);
			// domainTags.value = await currentDomainDataContent.value[0].tags;
		};
		rigthData();
	};

	const getMenuData = async () => {
		await store.dispatch("appDomain/fetchDomainesTree");
		const allDomainTree = computed(
			() => store.getters["appDomain/allDomainesTree"]
		);
		console.log("(menu.value: ", menu.value);
		return (menu.value = [
			{
				id: allDomainTree?.value?.ID,
				parentID: allDomainTree?.value?.ParentID,
				label: allDomainTree?.value?.Name,
				avatar: allDomainTree?.value?.Logo,
				handler: (node) => goToID(node),
				children: allDomainTree?.value?.Childs?.map((item) => {
					return {
						id: item?.ID,
						parentID: item?.ParentID,
						label: item?.Name,
						avatar: item?.Logo,
						handler: (item) => goToID(item),
						children: item?.Childs?.map((subItem) => {
							return {
								id: subItem?.ID,
								parentID: subItem?.ParentID,
								label: subItem?.Name,
								avatar: subItem?.Logo,
								handler: (subItem) => goToID(subItem),
								children: subItem?.Childs?.map((subLastItem) => {
									return {
										id: subLastItem?.ID,
										parentID: subLastItem?.ParentID,
										label: subLastItem?.Name,
										avatar: subLastItem?.Logo,
										handler: (subLastItem) => goToID(subLastItem),
									};
								}),
							};
						}),
					};
				}),
			},
		]);
	};
	getMenuData();

	const refreshDomain = async (id) => {
		await store.dispatch("appDomain/fetchDomainById", id);
		let data = computed(() => store.getters["appDomain/allDomaines"]);
		currentDomainDataContent.value = await data.value;
		console.log(" data.value: ", data.value);
		domainTags.value = await data.value[0].Tags;
		console.log("	Refresh domainTags.value: ", domainTags.value);
		await getMenuData();
	};
	const refreshDomainTag = async (id) => {
		await store.dispatch("appDomain/fetchDomainById", id);
		let data = computed(() => store.getters["appDomain/allDomaines"]);
		console.log(" data.value from refreshDomainTag: ", data.value);
		console.log("	Refresh domainTags.value: ", domainTags.value);
		return (domainTags.value = await data.value.Tags);
		// await getMenuData();
	};

	const addTagtoDomain = async (tag) => {
		console.log("tag:", tag);
		console.log("tag id:", tag.id);
		// store.dispatch("appDomain/addDomainTag", props.id, `${tag.id}`);
		//TODO: Modify Axios action
		try {
			await API.post(`/domain/${choosenNodeID.value}/tag/${tag.id}`);
			refreshDomainTag(choosenNodeID.value);
		} catch (error) {
			console.log(err);
		}
	};
	addTagtoDomain();

	const getTagsTree = async () => {
		await store.dispatch("appTags/fetchAllTagsTree");
		let data = computed(() => store.getters["appTags/allTagsTree"]);
		globalTagsTreeList.value = [data.value].map((tag) => {
			return {
				id: tag?.ID,
				label: tag?.Name,
				handler: (tag) => addTagtoDomain(tag),
				icon: "sell",
				children: tag.Childs?.map((child) => {
					return {
						id: child.ID,
						label: child.Name,
						handler: (child) => addTagtoDomain(child),
						icon: "sell",
						children: child.Childs?.map((subChild) => {
							return {
								id: subChild.ID,
								label: subChild.Name,
								handler: (subChild) => addTagtoDomain(subChild),
								icon: "sell",
								children: subChild.Childs?.map((lastChild) => {
									return {
										id: lastChild.ID,
										label: lastChild.Name,
										handler: (lastChild) => addTagtoDomain(lastChild),
										icon: "sell",
									};
								}),
							};
						}),
					};
				}),
			};
		});
		console.log("globalTagsTreeList: ", globalTagsTreeList.value);
	};
	getTagsTree();

	const OnDelete = async (id) => {
		console.log("deleted ID:", id);
		//TODO: Add Axios Action
		await API.delete(`/domain/${choosenNodeID.value}/tag/${id}`)
			.then((response) => console.log(response))
			.then(() => refreshDomainTag(route.currentRoute.value.params.id))
			.catch((error) => console.log(error));
	};

	const OnEdit = () => {
		editMode.value = !editMode.value;
	};

	const confirm = (id) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				OnDelete(id);
			})
			.onCancel(() => {
				console.log("Cancel");
			});
	};

	return {
		$q,
		menu,
		store,
		editMode,
		getMenuData,

		choosenNodeID,
		currentDomainDataContent,
		progress,
		domainTags,
		globalTagsTreeList,
		getTagsTree,
		OnDelete,
		confirm,
		OnEdit,
		domainID,
	};
}
