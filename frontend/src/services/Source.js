import API from "./index";

export default {
	source() {
		return API.get("sourceSideBar");
	},
};
