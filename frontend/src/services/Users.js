import API from "./index";
const END_POINT = "/user";

export default {
	getAlllUsers() {
		return API.get(END_POINT);
	},
	getUser(id) {
		return API.get(`${END_POINT}/${id}`);
	},
	addUser(data) {
		return API.post(END_POINT, data);
	},
	updateUser( id, data ){
    return API.put( `${END_POINT}/${id}, ${data}` );
	},
	deleteUser(id) {
		return API.delete(`${END_POINT}/${id}`);
	},
};
