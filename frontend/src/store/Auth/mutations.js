import axios from "axios";

export const SET_USER_DATA = (state, userData) => {
	localStorage.setItem("user", userData.accessToken);
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${userData.accessToken}`;
	userData.accessToken
		? (state.authenticated = true)
		: (state.authenticated = false);
	state.user = userData.user;
};

export const CLEAR_USER_DATA = (state) => {
	localStorage.removeItem("user");
	location.reload();
	state.authenticated = false;
};

export const USER = (state, user) => {
	state.user = user;
};
