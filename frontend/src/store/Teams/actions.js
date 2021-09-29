import API from "../../services/index";

export const fetchAllTeams = async ({ commit }) => {
	let response = await API.get("/domain");
	commit("GET_TEAMS", response.data);
};

export const fetchTeamById = async ({ commit }, team) => {
	let response = await API.put(`/domain/${team.id}`, team);
	commit("GET_TEAM_BY_ID", response.data);
};

export const addTeam = async ({ commit }, team) => {
	let response = await API.post(`/domain/${team.pid}`, team);
	commit("NEW_TEAM", response.data);
};
export const updateTeam = async ({ commit }, team) => {
	let response = await API.put(`/domain/${team.id}`, team);
	commit("UPDATE_TEAM", response.data);
};

export const removeTeam = async ({ commit }, id) => {
	await API.delete(`/domain/${id}`);
	commit("DELETE_TEAM", id);
};
