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
				path: "product",
				component: () => import("pages/Products/PageProductChild.vue"),
				meta: { requiresAuth: false },
			},
			{
				path: "product/:id",
				component: () => import("pages/Products/PageProductChild.vue"),
				props: true,
				meta: { requiresAuth: false },
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
				component: () => import("pages/Home/PageHome.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "home/profile",
				component: () => import("pages/Home/PageHomeProfile.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "home/products",
				component: () => import("pages/Home/PageHomeProducts.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "home/workspaces",
				component: () => import("pages/Home/PageHomeWorkspaces.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "libraries",
				component: () => import("pages/PageLibraries.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "dashboard",
				component: () => import("pages/Dashboard/PageDashboard.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings",
				component: () => import("pages/Settings/PageSettingsUsers.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/users",
				component: () => import("pages/Settings/PageSettingsUsers.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/roles",
				component: () => import("pages/Settings/PageSettingsRoles.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/authorizations",
				component: () =>
					import("pages/Settings/PageSettingsAuthorizations.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/requirements",
				component: () => import("pages/Settings/PageSettingsRequirements.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/tags",
				component: () => import("pages/Settings/PageSettingsTags.vue"),
				meta: { requiresAuth: true },
			},
			{
				path: "settings/environmentstypes",
				component: () => import("pages/Settings/PageSettingsEnviType.vue"),
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
				component: () => import("pages/Auth/Login.vue"),
			},
			{
				path: "/register",
				component: () => import("pages/Auth/Register.vue"),
			},
		],
	},
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/Error404.vue"),
	},
];

export default routes;
