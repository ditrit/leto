export const GET_ENVITYPE = (state, enviType) => (state.enviTypes = enviType);

export const GET_ENVITYPE_BY_ID = (state, id) => {
	const index = state.enviTypes.findIndex((enviType) => enviType.id === id);
	state.enviTypes.splice(index, 1, id);
};

export const NEW_ENVITYPE = (state, enviType) =>
	state.enviTypes.unshift(enviType);

export const UPDATE_ENVITYPE = (state, updatedEnviType) => {
	const index = state.enviTypes.findIndex(
		(enviType) => enviType.ID === updatedEnviType
	);
	state.enviTypes[index] = updatedEnviType;
};
export const DELETE_ENVITYPE = (state, enviTypeId) =>
	(state.enviTypes = state.enviTypes.filter(
		(enviType) => enviType.id !== enviTypeId
	));
