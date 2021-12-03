import API from "../../services/index";

export const fetchAllEnvironments = async ({ commit }) => {
	let response = await API.get("/environment");
	commit("GET_ENVIRONMENT", response.data);
};

export const fetchEnvironmentyId = async ({ commit }, environment) => {
	let response = await API.put(`/environment/${environment.id}`, environment);
	commit("GET_ENVIRONMENT_BY_ID", response.data);
};

export const addEnvironment = async ({ commit }, environment) => {
	let response = await API.post(`/environment`, environment);
	commit("NEW_ENVIRONMENT", response.data);
};
export const updateEnvironment = async ({ commit }, environment) => {
	let response = await API.put(`/environment/${environment.id}`, environment);
	commit("UPDATE_ENVIRONMENT", response.data);
};

export const removeEnvironment = async ({ commit }, id) => {
	await API.delete(`/environment/${id}`);
	commit("DELETE_ENVIRONMENT", id);
};
