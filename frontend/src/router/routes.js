const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "/tool-one/",
        component: () => import("pages/Model.vue"),
      },
      {
        path: "/tool-one/model",
        component: () => import("pages/Model.vue"),
      },
      {
        path: "/tool-one/source",
        component: () => import("pages/Source.vue"),
      },
      {
        path: "/tool-two",
        component: () => import("pages/PageToolTwoViewer.vue"),
      },
      {
        path: "/tool-three",
        component: () => import("pages/PageToolThreeViewer.vue"),
      },
      {
        path: "/tool-four",
        component: () => import("pages/PageToolFourViewer.vue"),
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
