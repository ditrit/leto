export const GET_AUTHORIZATION = (state, teamMember) =>
	(state.authorization = teamMember);

export const GET_AUTHORIZATION_BY_ID = (state, id) => {
	const index = state.authorization.findIndex(
		(teamMember) => teamMember.id === id
	);
	state.teams.splice(index, 1, id);
};

export const NEW_AUTHORIZATION = (state, teamMember) =>
	state.teams.unshift(teamMember);

export const UPDATE_AUTHORIZATION = (state, updatedTeam) => {
	const index = state.authorization.findIndex(
		(teamMember) => teamMember.id === updatedTeam
	);
	state.teams.splice(index, 1, updatedTeam);
};
export const DELETE_AUTHORIZATION = (state, teamId) =>
	(state.teams = state.authorization.filter(
		(teamMember) => teamMember.id !== teamId
	));
