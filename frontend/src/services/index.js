import axios from "axios";

const API = axios.create({
	baseURL: "http://127.0.0.1:9203/ditrit/Gandalf/1.0.0",
	// transformResponse: (response) =>
	// 	JSONBigInt({ storeAsString: true }).parse(response),
});

API.interceptors.request.use(
	(config) => {
		let params = new URLSearchParams();
		const userString = localStorage.getItem("user");
		const userData = userString;
		// console.log("userData requiste : ", userData);
		axios.defaults.headers.common["Authorization"] = `Bearer ${userData}`;
		config.headers.Authorization = `Bearer ${userData}`;
		params.append("Authorization", `Bearer ${userData}`);
		config.params = params;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
API.interceptors.response.use(
	(config) => {
		let params = new URLSearchParams();
		const userString = localStorage.getItem("user");
		const userData = userString;
		// console.log("userData requiste : ", userData);
		axios.defaults.headers.common["Authorization"] = `Bearer ${userData}`;
		config.headers.Authorization = `Bearer ${userData}`;
		params.append("Authorization", `Bearer ${userData}`);
		config.params = params;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default API;
