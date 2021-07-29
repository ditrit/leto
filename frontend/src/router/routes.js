const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
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
       path:"/login",
       component: () => import("pages/Login.vue"),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },

];

export default routes;
