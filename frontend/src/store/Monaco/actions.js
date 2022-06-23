export const getMonacoSource = async ({ commit }, source) => {
	await commit("SET_SOURCE", source);
};

export const getMetadatas = async ({ commit }, metadata) => {
	commit("GET_METADATAS", metadata);
};

export const removeDrawer = ({ commit }) => {
	commit("DRAWER_OFF");
};

export const drawerOn = ({ commit }) => {
	commit("DRAWER_ON");
};
