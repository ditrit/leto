import axios from "axios";

const API = axios.create({
	baseURL: process.env.BASEURL,
});

if (localStorage.getItem("user")) {
	const { accessToken } = JSON.parse(localStorage.getItem("user"));
	API.interceptors.request.use(
		async (config) => {
			config.headers.Authorization = await `Bearer ${accessToken}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	API.interceptors.response.use(
		async (config) => {
			config.headers.Authorization = await `Bearer ${accessToken}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
}

export default API;
