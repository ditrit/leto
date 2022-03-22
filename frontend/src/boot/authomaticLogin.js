import { boot } from "quasar/wrappers";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ store }) => {
	const autoLog = async () => {
		const userString = localStorage.getItem("user");
		if (userString) {
			const userData = userString;
			console.log("userData: ", userData.user);
			//store.commit("SET_USER_DATA", userData);
			store.dispatch("auth/currentUser", JSON.parse(userData));
		}
	};
	autoLog();
});
