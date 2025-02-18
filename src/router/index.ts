import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Chat",
      component: () => import("@/layout/Layout.vue"),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/Login.vue"),
    },
  ],
});


export default router;
