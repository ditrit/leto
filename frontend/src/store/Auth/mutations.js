import API from "../../services";
import axios from "axios";

export const SET_USER_DATA = (state, userData) => {
	localStorage.setItem("user", userData.access_token);
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${userData.access_token}`;
};

export const CLEAR_USER_DATA = () => {
	localStorage.removeItem("user");
	location.reload();
};
