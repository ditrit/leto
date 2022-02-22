import API from "../../services/index";

export const uploadFile = async ({ commit }, id, file) => {
	let response = await API.post(`/file/${id}`, file);
	commit("NEW_FILE", response);
};
export const downloadFile = async ({ commit }, id) => {
	let response = await API.get(`/file/${id}`);
	commit("GET_FILE", id, file);
};
