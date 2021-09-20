import axios from "axios";

const API = axios.create({
	// baseURL: "http://localhost:3000",
	baseURL: "http://127.0.0.1:9203/ditrit/Gandalf/1.0.0",
});

// API.interceptors.request.use((config) => {
// 	let params = new URLSearchParams();

// 	const token = this.$store.state.a.token;
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}

// 	params.append("auth", token);
// 	return config;
// });

// API.interceptors.response.use((response) => {
// 	return response;
// });
export default API;
