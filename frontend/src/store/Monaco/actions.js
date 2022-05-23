export const getMonacoSource = async ({ commit }, source) => {
	await commit("SET_SOURCE", source);
};
