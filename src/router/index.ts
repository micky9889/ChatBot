import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/layout/Layout.vue"),
      children: [
        {
          path: "",
          name: "CHAT",
          component: () => import("@/views/Chat.vue"),
        },
      ],
    },
    
  ],
});

export default router;
