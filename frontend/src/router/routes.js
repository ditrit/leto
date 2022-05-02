import MainLayout from "layouts/MainLayout.vue";
import LoginLayout from "layouts/LoginLayout.vue";
import LoginPage from "pages/Auth/Login.vue";
import RegisterPage from "pages/Auth/Register.vue";
import PageHome from "pages/Home/PageHome.vue";
import Page404 from "pages/Error404.vue";
import PageHomeProfile from "pages/Home/PageHomeProfile.vue";
import PageHomeProducts from "pages/Home/PageHomeProducts.vue";
import PageHomeWorkspaces from "pages/Home/PageHomeWorkspaces.vue";
import PageWorkspace from "pages/Workspaces/PageWorkspace.vue";
import PageWorkspaceChild from "pages/Workspaces/PageWorkspaceChild.vue";
import PageLibraries from "pages/Libraries/PageLibraries.vue";
import PageSettings from "pages/Settings/PageSettingsUsers.vue";
import PageSettingsUsers from "pages/Settings/PageSettingsUsers.vue";
import PageSettingsRoles from "pages/Settings/PageSettingsRoles.vue";
import PageSettingsAuthorizations from "pages/Settings/PageSettingsAuthorizations.vue";
import PageSettingsRequirements from "pages/Settings/PageSettingsRequirements.vue";
import PageSettingsTags from "pages/Settings/PageSettingsTags.vue";
import PageSettingsEnviType from "pages/Settings/PageSettingsEnviType.vue";
import PageSettingsDashboard from "pages/Settings/PageSettingsDashboard.vue";
import PageProductChild from "pages/Products/PageProductChild.vue";

console.log("MainLayout: ", MainLayout);
const routes = [
	{
		path: "/",
		component: () => MainLayout,
		children: [
			{
				path: "home",
				component: () => PageHome,
				meta: { requiresAuth: true },
			},
			{
				path: "home/profile",
				component: () => PageHomeProfile,
				meta: { requiresAuth: true },
			},
			{
				path: "home/products",
				component: () => PageHomeProducts,
				meta: { requiresAuth: true },
			},
			{
				path: "home/workspaces",
				component: () => PageHomeWorkspaces,
				meta: { requiresAuth: true },
			},
			{
				path: "workspaces",
				component: () => PageWorkspace,
				meta: { requiresAuth: true },
			},
			{
				path: "workspaces/:id",
				component: () => PageWorkspaceChild,
				props: true,
				meta: { requiresAuth: true },
			},

			{
				path: "libraries",
				component: () => PageLibraries,
				meta: { requiresAuth: true },
			},
			{
				path: "settings",
				component: () => PageSettings,
				meta: { requiresAuth: true },
			},
			{
				path: "settings/users",
				component: () => PageSettingsUsers,
				meta: { requiresAuth: true },
			},
			{
				path: "settings/roles",
				component: () => PageSettingsRoles,
				meta: { requiresAuth: true },
			},
			{
				path: "settings/authorizations",
				component: () => PageSettingsAuthorizations,
				meta: { requiresAuth: true },
			},
			{
				path: "settings/requirements",
				component: () => PageSettingsRequirements,
				meta: { requiresAuth: true },
			},
			{
				path: "settings/tags",
				component: () => PageSettingsTags,
				meta: { requiresAuth: true },
			},
			{
				path: "settings/environmentstypes",
				component: () => PageSettingsEnviType,
				meta: { requiresAuth: true },
			},
			{
				path: "settings/dashboard",
				component: () => PageSettingsDashboard,
				meta: { requiresAuth: true },
			},
			{
				path: "product",
				component: () => PageProductChild,
				meta: { requiresAuth: false },
			},
			{
				path: "product/:id",
				component: () => PageProductChild,
				props: true,
				meta: { requiresAuth: false },
			},
		],
	},
	{
		path: "/login",
		component: () => LoginLayout,
		children: [
			{
				path: "/login",
				component: () => LoginPage,
			},
			{
				path: "/register",
				component: () => RegisterPage,
			},
		],
	},
	{ path: "", redirect: "/login" },
	{
		path: "/:catchAll(.*)*",
		component: () => Page404,
	},
];

export default routes;
