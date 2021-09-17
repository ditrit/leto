const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),

		children: [
			{ path: "", redirect: "/login" },
			{
				path: "teams",
				component: () => import("pages/PageTeams.vue"),
			},
			{
				path: "model",
				component: () => import("pages/Model.vue"),
			},
			{
				path: "source",
				component: () => import("pages/Source.vue"),
			},

			{
				path: "products",
				component: () => import("pages/PageProducts.vue"),
			},
			{
				path: "libraries",
				component: () => import("pages/PageLibraries.vue"),
			},
			{
				path: "dashboard",
				component: () => import("pages/PageDashboard.vue"),
			},
			{
				path: "settings",
				component: () => import("pages/PageSettings.vue"),
			},
		],
	},
	{
		path: "/login",
		component: () => import("layouts/LoginLayout.vue"),
		children: [
			{
				path: "/login",
				component: () => import("pages/Login.vue"),
				// beforeEnter: (to, from, next) => {
				// 	const router = useRouter();

				// 	console.log("middleware:", from);
				// 	console.log(store);
				// 	if (store.getters["auth/authenticated"]) {
				// 		next(router.push("/register"));
				// 	}
				// },
			},
			{
				path: "/register",
				component: () => import("pages/Register.vue"),
			},
		],
	},
	// {
	// 	path: "/home",
	// 	component: () => import("layouts/NoLayout.vue"),
	// 	children: [
	// 		{
	// 			path: "/home",
	// 			component: () => import("pages/Home.vue"),
	// 		},
	// 		{
	// 			path: "/signin",
	// 			component: () => import("pages/SignIn.vue"),
	// 		},
	// 		{
	// 			path: "/dash",
	// 			component: () => import("pages/Dashboard.vue"),
	// 			beforeEnter: (to, from, next) => {
	// 				console.log("middleware:", from);
	// 				console.log(store);
	// 				if (store.getters["auth/authenticated"]) {
	// 					next(router.push("signin"));
	// 				}
	// 			},
	// 		},
	// 	],
	// },

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/Error404.vue"),
	},
];

export default routes;
