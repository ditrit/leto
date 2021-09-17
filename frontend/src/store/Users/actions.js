import API from "../../services/index";
import axiosSetUp from "../../services/requestInterseptor";

export const fetchUsers = async ({ commit }) => {
	let response = await API.get("/user");
	commit("GET_USERS", response.data);
};
export const addUser = async ({ commit }, user) => {
	let response = await API.post("/user/register", user);
	commit("NEW_USER", response.data);
};
export const updateUser = async ({ commit }, user) => {
	let response = await API.put(`/user/${user.id}`, user);
	commit("UPDATE_USER", response.data);
};
export const removeUser = async ({ commit }, id) => {
	await API.delete(`/user/${id}`);
	commit("DELETE_USER", id);
};
export const logInUser = async ({ commit }, user) => {
	const response = await API.post("/login", user);
	commit("LOGIN_USER", response.data);
};

export const fetchappUsers = async ({ commit }) => {
	let response = await API.get("/user");
	commit("GET_LOGIN_USERS", response.data);
};

// export const fetchUsers = async ({ commit }) => {
// 	let response = await API.get("/user");
// 	commit("GET_USERS", response.data);
// };
// export const addUser = async ({ commit }, user) => {
// 	let response = await API.post("/user", user);
// 	commit("NEW_USER", response.data);
// };
// export const updateUser = async ({ commit }, user) => {
// 	let response = await API.put(`/user/${user.id}`, user);
// 	commit("UPDATE_USER", response.data);
// };
// export const removeUser = async ({ commit }, id) => {
// 	await API.delete(`/user/${id}`);
// 	commit("DELETE_USER", id);
// };
// export const logInUser = async ({ commit }, user) => {
// 	const response = await API.post("user/login", user);
// 	commit("LOGIN_USER", response.data);
// };

// export const fetchappUsers = async ({ commit }) => {
// 	let response = await API.get("/user");
// 	commit("GET_LOGIN_USERS", response.data);
// };
