export const GET_TEAMS = (state, teams) => (state.teams = teams);

export const GET_TEAM_BY_ID = (state, id) => {
	const index = state.teams.findIndex((team) => team.id === id);
	state.teams.splice(index, 1, id);
};

export const NEW_TEAM = (state, team) => state.teams.unshift(team);

export const UPDATE_TEAM = (state, updatedTeam) => {
	const index = state.teams.findIndex((team) => team.id === updatedTeam);
	state.teams.splice(index, 1, updatedTeam);
};
export const DELETE_TEAM = (state, teamId) =>
	(state.teams = state.teams.filter((team) => team.id !== teamId));
