export const SET_SOURCE = (state) => {
	state.monacoSource = JSON.parse(localStorage.getItem("monacoSource"));
};

export const GET_METADATAS = (state, metadata) =>
	(state.metadatas = metadata);