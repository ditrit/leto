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
import appAuthorization from "./Authorizations/index";
import appFiles from "./Files/index";
import appGit from "./Git/index";
import appMonaco from "./Monaco/index";
import appSVGs from "./SVGs/index";

export default store(function () {
	return createStore({
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
			appMonaco,
			appSVGs
		},
		strict: process.env.DEBUGGING,
	});
});
