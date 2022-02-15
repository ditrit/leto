import API from "../../services/index";

export const fetchDomainesTree = async ({ commit }) => {
	let response = await API.get("/domain/tree");
	commit("GET_DOMAINS_TREE", response.data);
};
export const fetchAllDomaines = async ({ commit }) => {
	let response = await API.get("/domain");
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

// Domain Tags
export const fetchDomainTags = async ({ commit }, id) => {
	await API.get(`/domain/${id}/tag`);
	commit("GET_DOMAIN_TAGS", id);
};

export const addDomainTag = async ({ commit }, domainId, tagId) => {
	await API.post(`/domain/${domainId}/tag/${tagId}`);
	commit("ADD_DOMAIN_TAGS", tagId);
};

export const removeDomainTag = async ({ commit }, domainId, tagId) => {
	await API.delete(`/domain/${domainId}/tag/${tagId}`);
	commit("DELETE_DOMAIN_TAG", domainId, tagId);
};

// Domain Libraries
export const fetchDomainLibraries = async ({ commit }, id) => {
	await API.get(`/domain/${id}/library`);
	commit("GET_DOMAIN_LIBRARIES", id);
};

export const addDomainLibrary = async ({ commit }, domainId, libraryId) => {
	await API.post(`/domain/${domainId}/library/${libraryId}`);
	commit("ADD_DOMAIN_LIBRARY", libraryId);
};

export const removeDomainLibrary = async ({ commit }, domainId, libraryId) => {
	await API.delete(`/domain/${domainId}/library/${libraryId}`);
	commit("DELETE_DOMAIN_LIBRARY", domainId, libraryId);
};
