import axios from "axios";

const API = axios.create({
	// baseURL: "http://localhost:3000",
	baseURL: "http://127.0.0.1:9203/ditrit/Gandalf/1.0.0",
});

export default API;
