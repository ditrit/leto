import API from "../../services/index";
import axios from "axios";

export const register = ({ commit }, credentials) => {
	return API.post("/user/register", credentials).then(({ data }) => {
		commit("SET_USER_DATA", data);
	});
};

export const login = ({ commit }, credentials) => {
	return API.post("/user/login", credentials).then(({ data }) => {
		commit("SET_USER_DATA", data);
	});
};

export const logout = ({ commit }) => {
	API.post("/user/logout");
	commit("CLEAR_USER_DATA");
};
