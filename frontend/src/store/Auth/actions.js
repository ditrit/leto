import API from "../../services/index";

export const signIn = async ({ commit, dispatch }, credentials) => {
	let response = await API.post("/signin", credentials);

	// commit("NEW_LOGIN", response.data);
	dispatch("attempt", response.data.accessToken);
};

export const attempt = async ({ commit }, token) => {
	commit("SET_TOKEN", token);

	const headerOptions = {
		Authorization: "Bearer " + token,
	};

	try {
		let response = await API.get("/users", { headers: headerOptions });
		commit("SET_USER", response.data);
	} catch (error) {
		console.log(error.message);
		commit("SET_TOKEN", null);
		commit("SET_USER", null);
	}
};
