export const GET_ENVITYPE = (state, enviType) => (state.enviTypes = enviType);

export const GET_ENVITYPE_BY_ID = (state, id) => {
	const index = state.roles.findIndex((enviType) => enviType.id === id);
	state.roles.splice(index, 1, id);
};

export const NEW_ENVITYPE = (state, enviType) => state.roles.unshift(enviType);

export const UPDATE_ENVITYPE = (state, updatedEnviType) => {
	const index = state.roles.findIndex(
		(enviType) => enviType.id === updatedEnviType
	);
	state.enviTypes.splice(index, 1, updatedEnviType);
};
export const DELETE_ENVITYPE = (state, roleId) =>
	(state.enviTypes = state.enviTypes.filter(
		(enviType) => enviType.id !== roleId
	));
