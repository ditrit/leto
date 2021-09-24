import API from "../../services/index";

export const fetchAllDomaines = async ({ commit }) => {
	let response = await API.get("/domain");
	commit("GET_DOMAINS", response.data);
};

export const fetchDomaineById = async ({ commit }, domain) => {
	let response = await API.put(`/domain/${domain.id}`, domain);
	commit("GET_DOMAIN_BY_ID", response.data);
};

export const addDomain = async ({ commit }, domain) => {
	let response = await API.post(`/domain/${domain.id}`, domain);
	commit("NEW_DOMAIN", response.data);
};
export const updateDomain = async ({ commit }, domain) => {
	let response = await API.put(`/domain/${domain.id}`, domain);
	commit("UPDATE_DOMAIN", response.data);
};

export const removeDomain = async ({ commit }, id) => {
	await API.delete(`/domain/${id}`);
	commit("DELETE_DOMAIN", id);
};
