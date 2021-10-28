import API from "../../services/index";

export const fetchDomainesTree = async ({ commit }) => {
	let response = await API.get("/domain/tree");
	commit("GET_DOMAINS_TREE", response.data);
};
export const fetchAllDomaines = async ({ commit }) => {
	let response = await API.get("/domain");
	console.log("response.data from action: ", response.data);
	commit("GET_DOMAINS", response.data);
};

export const fetchDomainById = async ({ commit }, id) => {
	let response = await API.get(`/domain/${id}`);
	commit("GET_DOMAIN_BY_ID", response.data);
};

export const addDomain = async ({ commit }, domain) => {
	let response = await API.post(`/domain/${domain.pid}`, domain);
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
export const fetchDomainTags = async ({ commit }, id) => {
	await API.get(`/domain/${id}/tag`);
	commit("GET_DOMAIN_TAGS", id);
};
export const addDomainTag = async (
	{ commit },
	domainId = "703911909106483201",
	tagId = "703911909124931585"
) => {
	await API.post(`/domain/${domainId}/tag/${tagId}`);
	commit("ADD_DOMAIN_TAGS", domainId, tagId);
};

export const removeDomainTag = async (
	{ commit },
	domainId = "703911909106483201",
	tagId = "703911909124931585"
) => {
	await API.delete(`/domain/${domainId}/tag/${tagId}`);
	commit("DELETE_DOMAIN_TAG", domainId, tagId);
};
