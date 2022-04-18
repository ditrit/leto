import { boot } from "quasar/wrappers";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ store }) => {
	const autoLog = () => {
		const userString = localStorage.getItem("user");
		if (userString) {
			const userData = userString;
			store.dispatch("auth/currentUser", JSON.parse(userData));
		}
	};
	//autoLog();

	// window.addEventListener("load", () => {
	// 	autoLog();
	// });
});
