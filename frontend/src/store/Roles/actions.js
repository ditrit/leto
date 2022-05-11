import API from "../../services/index";

export const fetchAllRoles = async ({ commit }) => {
	let response = await API.get("/role");
	commit("GET_ROLE", response.data);
};

export const fetchRoleyId = async ({ commit }, role) => {
	let response = await API.put(`/role/${role.ID}`, role);
	commit("GET_ROLE_BY_ID", response.data);
};

export const addRole = async ({ commit }, role) => {
	let response = await API.post(`/role`, role);
	commit("NEW_ROLE", response.data);
};
export const updateRole = async ({ commit }, role) => {
	let response = await API.put(`/role/${role.ID}`, role);
	commit("UPDATE_ROLE", response.data);
};

export const removeRole = async ({ commit }, id) => {
	await API.delete(`/role/${id}`);
	commit("DELETE_ROLE", id);
};
