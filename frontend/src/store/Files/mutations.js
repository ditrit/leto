export const NEW_FILE = (state, file) => state.files.unshift(file);

export const GET_FILE = (state, id) => {
	const index = state.files.findIndex((file) => file.id === id);
	state.files.splice(index, 1, id);
};
