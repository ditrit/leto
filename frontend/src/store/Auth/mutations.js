import axios from "axios";

export const SET_USER_DATA = (state, userData) => {
	localStorage.setItem("user", userData.accessToken);
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${userData.accessToken}`;
	state.user = user.payload;
	userData.accessToken
		? (state.authenticated = true)
		: (state.authenticated = false);
};

export const CLEAR_USER_DATA = () => {
	localStorage.removeItem("user");
	location.reload();
};

export const USER = (state, user) => {
	state.user = user;
};
