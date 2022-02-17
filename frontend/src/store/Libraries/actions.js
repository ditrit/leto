import API from "../../services/index";

export const fetchAllLibraries = async ({ commit }) => {
	let response = await API.get("/library");
	commit("GET_LIBRARY", response.data);
};

export const fetchLibraryId = async ({ commit }, id) => {
	let response = await API.get(`/library/${id}`);
	commit("GET_LIBRARY_BY_ID", response.data);
};

export const addLibrary = async ({ commit }, library) => {
	let response = await API.post(`/library`, library);
	commit("NEW_LIBRARY", response.data);
};
export const updateLibrary = async ({ commit }, library) => {
	let response = await API.put(`/library/${library.id}`, library);
	commit("UPDATE_LIBRARY", response.data);
};

export const removeLibrary = async ({ commit }, id) => {
	await API.delete(`/library/${id}`);
	commit("DELETE_LIBRARY", id);
};
