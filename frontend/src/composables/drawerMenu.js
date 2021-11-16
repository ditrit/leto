// import { ref, computed } from "vue";
// import { useStore } from "vuex";

// const getDrawerMenu = async () => {
// 	const store = useStore();
// 	const menu = ref(null);
// 	await store.dispatch("appDomain/fetchDomainesTree");
// 	const allDomainTree = await computed(
// 		() => store.getters["appDomain/allDomainesTree"]
// 	);
// 	return (menu.value = [
// 		{
// 			id: allDomainTree?.value?.ID,
// 			parentID: allDomainTree?.value?.ParentID,
// 			label: allDomainTree?.value?.Name,
// 			avatar: allDomainTree?.value?.Logo,
// 			handler: (node) => goToID(node),
// 			children: allDomainTree?.value?.Childs?.map((item) => {
// 				return {
// 					id: item?.ID,
// 					parentID: item?.ParentID,
// 					label: item?.Name,
// 					avatar: item?.Logo,
// 					handler: (item) => goToID(item),
// 					children: item?.Childs?.map((subItem) => {
// 						return {
// 							id: subItem?.ID,
// 							parentID: subItem?.ParentID,
// 							label: subItem?.Name,
// 							avatar: subItem?.Logo,
// 							handler: (subItem) => goToID(subItem),
// 							children: subItem?.Childs?.map((subLastItem) => {
// 								return {
// 									id: subLastItem?.ID,
// 									parentID: subLastItem?.ParentID,
// 									label: subLastItem?.Name,
// 									avatar: subLastItem?.Logo,
// 									handler: (subLastItem) => goToID(subLastItem),
// 								};
// 							}),
// 						};
// 					}),
// 				};
// 			}),
// 		},
// 	]);
// };

// export default getDrawerMenu;
