import axios from "axios";

const API = axios.create({
	baseURL: "http://127.0.0.1:9203/ditrit/Gandalf/1.0.0",
});

if (localStorage.getItem("user")) {
	API.interceptors.request.use(
		(config) => {
			let params = new URLSearchParams();
			const { accessToken } = JSON.parse(localStorage.getItem("user"));
			if (!config.headers.Authorization) {
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${accessToken}`;
				config.headers.Authorization = `Bearer ${accessToken}`;
				params.append("Authorization", `Bearer ${accessToken}`);
				config.params = params;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
}
if (localStorage.getItem("user")) {
	API.interceptors.response.use(
		(config) => {
			let params = new URLSearchParams();
			const { accessToken } = JSON.parse(localStorage.getItem("user"));

			if (!config.headers.Authorization) {
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${accessToken}`;
				config.headers.Authorization = `Bearer ${accessToken}`;
				params.append("Authorization", `Bearer ${accessToken}`);
			}
			config.params = params;
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
}
export default API;
