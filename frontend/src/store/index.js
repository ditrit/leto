import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import createPersistedState from "vuex-persistedstate";
import auth from "./Auth/index";
import appUsers from "./Users/index";
import appDomain from "./Domains/index";
import appTags from "./Tags/index";
import appRoles from "./Roles/index";
import appEnviType from "./EnviType/index";
import appEnvironment from "./Environment/index";
import appProducts from "./Products/index";
import appAuthorization from "./Authorization/index";
import appFiles from "./Files/index";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
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
		},
		strict: process.env.DEBUGGING,
	});

	return Store;
});
