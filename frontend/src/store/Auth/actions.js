import API from "../../services/index";
import axiosSetUp from "../../services/requestInterseptor";

export const logIn = async ({ dispatch }, credentials) => {
	let response = await API.post("/user/login", credentials);
	dispatch("attempt", response.data.access_token);
};

export const attempt = async ({ commit }, token) => {
	commit("SET_TOKEN", token);

	try {
		console.log("token: ", token);
		localStorage.setItem("My token", token);
		commit("SET_LOGGED_IN_USER");
	} catch (error) {
		console.log(error.message);
		commit("SET_TOKEN", null);
		commit("SET_USER", null);
	}
};

export const logOut = ({ commit }) => {
	return API.post("/user/logout").then(() => {
		commit("SET_TOKEN", null);
		commit("SET_USER", null);
		localStorage.removeItem("token");
	});
};

// export const logIn = async ({ dispatch }, credentials) => {
// 	let response = await API.post("/login", credentials);
// 	dispatch("attempt", response.data.accessToken);
// };

// export const attempt = async ({ commit, state }, token) => {
// 	commit("SET_TOKEN", token);
// 	try {
// 		let response = await API.get("/users");
// 		commit("SET_USER", response.data);
// 		localStorage.setItem("token", token);
// 	} catch (error) {
// 		console.log(error.message);
// 		commit("SET_TOKEN", null);
// 		commit("SET_USER", null);
// 	}
// };

// export const logOut = ({ commit }) => {
// 	return API.post("/logout").then(() => {
// 		commit("SET_TOKEN", null);
// 		commit("SET_USER", null);
// 		localStorage.removeItem("token");
// 	});
// };
