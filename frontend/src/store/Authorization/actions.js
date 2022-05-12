import API from "../../services/index";

export const fetchAllAuthorization = async ({ commit }) => {
	let response = await API.get("/authorization");
	commit("GET_AUTHORIZATION", response.data);
};

export const fetchAuthorizationById = async ({ commit }, id) => {
	let response = await API.put(`/authorization/${id}`);
	commit("GET_AUTHORIZATION_BY_ID", response.data);
};

export const addAuthorization = async ({ commit }, teamMember) => {
	let response = await API.post(`/authorization`, teamMember);
	commit("NEW_AUTHORIZATION", response.data);
};
export const updateAuthorization = async ({ commit }, updates) => {
	let response = await API.put(`/authorization/${updates.ID}`, updates);
	commit("UPDATE_AUTHORIZATION", response.data);
};

export const removeAuthorization = async ({ commit }, id) => {
	await API.delete(`/authorization/${id}`);
	commit("DELETE_AUTHORIZATION", id);
};
