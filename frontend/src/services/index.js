import axios from "axios";
import store from "../store";

const API = axios.create({
	baseURL: "http://127.0.0.1:9203/ditrit/Gandalf/1.0.0",
});

API.interceptors.request.use((config) => {
	let params = new URLSearchParams();
	const userString = localStorage.getItem("user");

	const userData = userString;
	console.log("userData requiste : ", userData);
	axios.defaults.headers.common["Authorization"] = `Bearer ${userData}`;

	// this.$store.commit("auth/SET_USER_DATA", userData);
	params.append("Authorization", `Bearer ${userData}`);
	config.params = params;
	return config;
});
API.interceptors.response.use((config) => {
	let params = new URLSearchParams();
	const userString = localStorage.getItem("user");

	const userData = userString;
	console.log("userData response : ", userData);
	axios.defaults.headers.common["Authorization"] = `Bearer ${userData}`;
	// this.$store.commit("auth/SET_USER_DATA", userData);
	params.append("Authorization", `Bearer ${userData}`);
	config.params = params;
	return config;
});
export default API;
