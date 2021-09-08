import API from "../../services/index";

export const fetchUsers = async ({ commit }) => {
	let response = await API.get("/users");
	commit("GET_USERS", response.data);
};
export const addUser = async ({ commit }, user) => {
	let response = await API.post("/users", user);
	commit("NEW_USER", response.data);
};
export const updateUser = async ({ commit }, user) => {
	let response = await API.put(`/users/${user.id}`, user);
	commit("UPDATE_USER", response.data);
};
export const removeUser = async ({ commit }, id) => {
	await API.delete(`/users/${id}`);
	commit("DELETE_USER", id);
};
export const logInUser = async ({ commit }, user) => {
	await API.post("/login", user);
	commit("LOGIN_USER", user);
};

export const fetchappUsers = async ({ commit }) => {
	let response = await API.get("/login");
	commit("GET_LOGIN_USERS", response.data);
};
