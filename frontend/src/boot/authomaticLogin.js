import { boot } from "quasar/wrappers";

export default boot(({ store }) => {
	const autoLog = () => {
		const userString = localStorage.getItem("user");
		if (userString) {
			const userData = userString;
			store.dispatch("auth/currentUser", JSON.parse(userData));
		}
	};

	autoLog();
});
