import API from "src/services";

export const SET_USER_DATA = (state, userData) => {
	state.user = userData;
	localStorage.setItem("user", JSON.stringify(userData));
	API.defaults.headers.common[
		"Authorization"
	] = `Bearer ${userData.accessToken}`;
};

export const CLEAR_USER_DATA = (state) => {
	localStorage.removeItem("user");
	location.reload();
};

export const USER = (state, user) => {
	state.user = user;
};
