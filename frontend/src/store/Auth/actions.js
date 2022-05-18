import API from "../../services/index";

export const register = async ({ commit }, credentials) => {
	const response = await API.post("/user/register", credentials);
	commit("SET_USER_DATA", response.data);
};

export const login = async ({ commit }, credentials) => {
	const response = await API.post("/user/login", credentials);
	commit("SET_USER_DATA", response.data);
};

export const currentUser = ({ commit }, user) => {
	commit("USER", user);
};

export const logout = ({ commit }) => {
	API.post("/user/logout");
	commit("CLEAR_USER_DATA");
};
