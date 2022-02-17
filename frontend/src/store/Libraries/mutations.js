export const GET_LIBRARY = (state, library) => (state.libraries = library);

export const GET_LIBRARY_BY_ID = (state, id) => {
	const index = state.libraries.findIndex((library) => library.id === id);
	state.libraries.splice(index, 1, id);
};

export const NEW_LIBRARY = (state, library) => state.libraries.unshift(library);

export const UPDATE_LIBRARY = (state, updatedLibrary) => {
	const index = state.libraries.findIndex(
		(library) => library.id === updatedLibrary
	);
	state.libraries.splice(index, 1, updatedLibrary);
};
export const DELETE_LIBRARY = (state, libraryId) =>
	(state.libraries = state.libraries.filter(
		(library) => library.id !== libraryId
	));
