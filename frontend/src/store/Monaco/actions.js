export const getMonacoSource = async ({ commit }, source) => {
	await commit("SET_SOURCE", source);
};

export const setResources = async ({ commit }, source) => {
	commit("SET_RESOURCES", source);
};

export const getMetadatas = async ({ commit }, metadata) => {
	commit("GET_METADATAS", metadata);
};