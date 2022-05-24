export const getMonacoSource = async ({ commit }, source) => {
	await commit("SET_SOURCE", source);
};

export const getMetadatas = async ({ commit }, metadata) => {
	console.log("metadata: ", metadata);
	commit("GET_METADATAS", metadata);
};
