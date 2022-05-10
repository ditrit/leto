import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import auth from "./Auth/index";
import appUsers from "./Users/index";
import appDomain from "./Domains/index";
import appTags from "./Tags/index";
import appRoles from "./Roles/index";
import appEnviType from "./EnviTypes/index";
import appEnvironment from "./Environment/index";
import appProducts from "./Products/index";
import appLibraries from "./Libraries/index";
import appAuthorization from "./Authorization/index";
import appFiles from "./Files/index";
import appGit from "./Git/index";

export default store(function () {
	const Store = createStore({
		modules: {
			auth,
			appUsers,
			appDomain,
			appRoles,
			appTags,
			appEnviType,
			appEnvironment,
			appAuthorization,
			appFiles,
			appProducts,
			appLibraries,
			appGit,
		},
		strict: process.env.DEBUGGING,
	});

	return Store;
});
