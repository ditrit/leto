const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/PageToolOneViewer.vue"),
      },
      {
        path: "/tool-one",
        component: () => import("pages/PageToolOneViewer.vue"),
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
