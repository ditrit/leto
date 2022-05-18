import axios from "axios";

const API = axios.create({
	baseURL: process.env.BASEURL,
});

localStorage.getItem("user") &&
	API.interceptors.request.use(
		(config) => {
			const { accessToken } = localStorage.getItem("user")
				? JSON.parse(localStorage.getItem("user"))
				: null;
			if (!config.headers.Authorization) {
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${accessToken}`;
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

localStorage.getItem("user") &&
	API.interceptors.response.use(
		(config) => {
			const { accessToken } = localStorage.getItem("user")
				? JSON.parse(localStorage.getItem("user"))
				: null;

			if (!config.headers.Authorization) {
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${accessToken}`;
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

export default API;
