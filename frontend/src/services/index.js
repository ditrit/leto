import axios from "axios";

const API = axios.create({
	baseURL: "http://127.0.0.1:9203/ditrit/Gandalf/1.0.0",
});
// const userString = localStorage.getItem("user");
// const userData = JSON.parse(userString);

// API.interceptors.request.use(
// 	(config) => {
// 		let params = new URLSearchParams();
// 		// console.log("userData requiste : ", userData);
// 		axios.defaults.headers.common[
// 			"Authorization"
// 		] = `Bearer ${userData.accessToken}`;
// 		config.headers.Authorization = `Bearer ${userData.accessToken}`;
// 		params.append("Authorization", `Bearer ${userData.accessToken}`);
// 		config.params = params;
// 		return config;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

// API.interceptors.response.use(
// 	(config) => {
// 		let params = new URLSearchParams();

// 		// console.log("userData requiste : ", userData);
// 		axios.defaults.headers.common[
// 			"Authorization"
// 		] = `Bearer ${userData.accessToken}`;
// 		config.headers.Authorization = `Bearer ${userData.accessToken}`;
// 		params.append("Authorization", `Bearer ${userData.accessToken}`);
// 		config.params = params;
// 		return config;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );

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
