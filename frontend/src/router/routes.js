const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),

		children: [
			{ path: "", redirect: "/login" },
			{
				path: "teams",
				component: () => import("pages/PageTeams.vue"),
				meta: { requiresAuth: true },
			},

			{
				path: "child",
				component: () => import("pages/PageTeamChild.vue"),
				meta: { requiresAuth: true },
			},

			{
				path: "model",
				component: () => import("pages/Model.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "source",
				component: () => import("pages/Source.vue"),
				meta: { requiresAuth: true },
			},

			{
				path: "products",
				component: () => import("pages/PageProducts.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "libraries",
				component: () => import("pages/PageLibraries.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "dashboard",
				component: () => import("pages/PageDashboard.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings",
				component: () => import("pages/PageSettings.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "domain",
				component: () => import("pages/PageDomain.vue"),
				meta: { requiresAuth: true },
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
