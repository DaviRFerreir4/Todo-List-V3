import LoginPage from "@/pages/login/LoginPage.vue"
import { createRouter, createWebHistory } from "vue-router"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "login" },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
  ],
})
