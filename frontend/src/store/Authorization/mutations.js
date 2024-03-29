export const GET_AUTHORIZATION = (state, teamMember) =>
	(state.authorizations = teamMember);

export const GET_AUTHORIZATION_BY_ID = (state, id) => {
	const index = state.authorizations.findIndex(
		(teamMember) => teamMember.id === id
	);
	state.authorizations.splice(index, 1, id);
};

export const NEW_AUTHORIZATION = (state, teamMember) =>
	state.authorizations.unshift(teamMember);

export const UPDATE_AUTHORIZATION = (state, updatedTeam) => {
	const index = state.authorizations.findIndex(
		(teamMember) => teamMember.id === updatedTeam
	);
	state.authorizations.splice(index, 1, updatedTeam);
};
export const DELETE_AUTHORIZATION = (state, teamId) =>
	(state.authorizations = state.authorizations.filter(
		(teamMember) => teamMember.id !== teamId
	));
