import API from "../../services/index";

export const signIn = async ({ dispatch }, credentials) => {
	let response = await API.post("/login", credentials);
	dispatch("attempt", response.data.accessToken);
};

export const attempt = async ({ commit, state }, token) => {
	commit("SET_TOKEN", token);

	let headerOptions;
	if ("SET_TOKEN") {
		headerOptions = {
			Authorization: "Bearer " + token,
		};
	} else {
		headerOptions = null;
	}
	try {
		let response = await API.get("/users", {
			headers: headerOptions,
		});
		commit("SET_USER", response.data);
		localStorage.setItem("token", token);
	} catch (error) {
		console.log(error.message);
		commit("SET_TOKEN", null);
		commit("SET_USER", null);
	}
};

export const logOut = ({ commit }) => {
	return API.post("/logout").then(() => {
		commit("SET_TOKEN", null);
		commit("SET_USER", null);
		localStorage.removeItem("token");
	});
};
