import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import createPersistedState from "vuex-persistedstate";
import auth from "./Auth/index";
import appUsers from "./Users/index";
import appDomain from "./Domain/index";

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
			a: auth,
			u: appUsers,
			d: appDomain,
		},
		// plugins: [createPersistedState()],

		// enable strict mode (adds overhead!)
		// for dev mode and --debug builds only
		strict: process.env.DEBUGGING,
	});

	return Store;
});
