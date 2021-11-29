import API from "../../services/index";

export const fetchAllTags = async ({ commit }) => {
	let response = await API.get("/tag");
	commit("GET_TAGS", response.data);
};

export const fetchTagsById = async ({ commit }, tag) => {
	let response = await API.put(`/tag/${tag.id}`, tag);
	commit("GET_TAGS_BY_ID", response.data);
};

export const addTag = async ({ commit }, tag) => {
	let response = await API.post(`/tag/${tag.parentID}`, tag);
	commit("NEW_TAG", response.data);
};
export const updateTag = async ({ commit }, tag) => {
	let response = await API.put(`/tag/${tag.id}`, tag);
	commit("UPDATE_TAGS", response.data);
};

export const removeTag = async ({ commit }, id) => {
	await API.delete(`/tag/${id}`);
	commit("DELETE_TAGS", id);
};
