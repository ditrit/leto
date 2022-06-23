import axios from "axios";
import jwtDecode from "jwt-decode";
import dayJS from "dayjs";


const API = axios.create({
	baseURL: process.env.BASEURL,
});

if (localStorage.getItem("user")) {
	const { accessToken } = JSON.parse(localStorage.getItem("user"));
	const user = jwtDecode(accessToken);
	const userID = jwtDecode(accessToken).UserID;
	const isExpired = dayJS.unix(user.exp).diff(dayJS()) < 1;

	API.interceptors.request.use(
		async (config) => {
			config.headers.Authorization = `Bearer ${accessToken}`;
			if(!isExpired) {
				return config;
			} else  {
				const response = await axios.post(`${process.env.BASEURL}/user/refreshtoken/${userID}`)
				localStorage.setItem("newToken", JSON.stringify(response.data.accessToken))
				config.headers.Authorization = `Bearer ${response.data.accessToken}`;
				return config;
			}
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	API.interceptors.response.use(
		async (config) => {
			config.headers.Authorization = `Bearer ${accessToken}`;
		if (!isExpired) {
		return config;
		} else {
			config.headers.Authorization = `Bearer ${localStorage.getItem(
				"newToken"
			)}`;
			return config;
		}
		},
		(error) => {
			return Promise.reject(error);
		}
	);
}

export default API;
