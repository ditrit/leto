import API from "../../services/index";

export const register = ({ commit }, credentials) => {
	API.post("/user/register", credentials)
		.then(({ data }) => {
			commit("SET_USER_DATA", data);
		})
		.catch((err) => console.log(err));
};

export const login = async ({ commit }, credentials) => {
	return API.post("/user/login", credentials)
		.then(({ data }) => {
			commit("SET_USER_DATA", JSON.parse(data));
			//console.log("data: ", data);
		})
		.catch((err) => console.log(err));
};

export const currentUser = ({ commit }, user) => {
	commit("USER", user);
};

export const logout = ({ commit }) => {
	API.post("/user/logout");
	commit("CLEAR_USER_DATA");
};
