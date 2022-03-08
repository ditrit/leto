const routes = [
	{
		path: "/",
		component: () => import("layouts/MainLayout.vue"),

		children: [
			{ path: "", redirect: "/login" },
			{
				path: "workspaces",
				component: () => import("pages/PageTeams.vue"),
				meta: { requiresAuth: true },
			},

			{
				path: "workspaces/:id",
				component: () => import("pages/PageDomainChild.vue"),
				props: true,
				meta: { requiresAuth: true },
			},

			{
				path: "model",
				component: () => import("pages/Model.vue"),
				meta: { requiresAuth: false },
			},
			{
				path: "source",
				component: () => import("pages/Source.vue"),
				meta: { requiresAuth: true },
			},

			{
				path: "home",
				component: () => import("pages/PageHome.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "home/profile",
				component: () => import("pages/PageHomeProfile.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "home/products",
				component: () => import("pages/PageHomeProducts.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "home/workspaces",
				component: () => import("pages/PageHomeWorkspaces.vue"),
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
				component: () => import("pages/PageSettingsUsers.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/users",
				component: () => import("pages/PageSettingsUsers.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/roles",
				component: () => import("pages/PageSettingsRoles.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/authorizations",
				component: () => import("pages/PageSettingsAuthorizations.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/requirements",
				component: () => import("pages/PageSettingsRequirements.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/tags",
				component: () => import("pages/PageSettingsTags.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/environmentstypes",
				component: () => import("pages/PageSettingsEnviType.vue"),
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
