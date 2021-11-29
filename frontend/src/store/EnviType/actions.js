import API from "../../services/index";

export const fetchAllEnviTypes = async ({ commit }) => {
	let response = await API.get("/environmentType");
	commit("GET_ENVITYPE", response.data);
};

export const fetchEnviTypeyId = async ({ commit }, enviType) => {
	let response = await API.put(`/environmentType/${enviType.id}`, enviType);
	commit("GET_ENVITYPE_BY_ID", response.data);
};

export const addEnviType = async ({ commit }, enviType) => {
	let response = await API.post(`/environmentType`, enviType);
	commit("NEW_ENVITYPE", response.data);
};
export const updateEnviType = async ({ commit }, enviType) => {
	let response = await API.put(`/environmentType/${enviType.id}`, enviType);
	commit("UPDATE_ENVITYPE", response.data);
};

export const removeEnviType = async ({ commit }, id) => {
	await API.delete(`/environmentType/${id}`);
	commit("DELETE_ENVITYPE", id);
};
