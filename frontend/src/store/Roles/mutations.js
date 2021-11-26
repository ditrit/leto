export const GET_ROLE = (state, role) => (state.authorization = role);

export const GET_ROLE_BY_ID = (state, id) => {
	const index = state.authorization.findIndex((role) => role.id === id);
	state.roles.splice(index, 1, id);
};

export const NEW_ROLE = (state, role) => state.teams.unshift(role);

export const UPDATE_ROLE = (state, updatedTeam) => {
	const index = state.authorization.findIndex(
		(role) => role.id === updatedTeam
	);
	state.teams.splice(index, 1, updatedTeam);
};
export const DELETE_ROLE = (state, roleId) =>
	(state.roles = state.authorization.filter((role) => role.id !== roleId));
