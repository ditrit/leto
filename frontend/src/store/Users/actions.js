import API from "../../services/index";

export const fetchUsers = async ({ commit }) => {
	let response = await API.get("/user");
	commit("GET_USERS", response.data);
};

export const addUser = async ({ commit }, payload) => {
	let response = await API.post("/user", payload);
	commit("NEW_USER", response.data);
};

export const updateUser = async ({ commit }, payload) => {
	let response = await API.put(`/user/${user.id}`, payload);
	commit("UPDATE_USER", response.data);
};

export const removeUser = async ({ commit }, user) => {
	let response = await API.delete(`/user/${user.id}`);
	commit("DELETE_USER", response.data);
};
