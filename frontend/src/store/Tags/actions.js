import API from "../../services/index";

export const fetchAllTagsTree = async ({ commit }) => {
	let response = await API.get("/tag/tree");
	commit("GET_TAGS_TREE", response.data);
};
export const fetchAllTags = async ({ commit }) => {
	let response = await API.get("/tag");
	commit("GET_TAGS", response.data);
};

export const addTag = async ({ commit }, tag) => {
	let response = await API.post(`/tag/${tag.pid}`, tag);
	commit("NEW_TAG", response.data);
};
export const updateTag = async ({ commit }, tag) => {
	let response = await API.put(`/tag/${tag.ID}`, tag);
	commit("UPDATE_TAG", response.data);
};

export const removeTag = async ({ commit }, id) => {
	await API.delete(`/tag/${id}`);
	commit("DELETE_TAG", id);
};
