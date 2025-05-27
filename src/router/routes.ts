import login from "@/views/login/index.vue";
//import home from "@/views/home/index.vue";
import layout from "@/layout/index.vue";
import notfound from "@/views/404/index.vue";

export const constantRoutes = [
  {
    name: "login",
    path: "/login",
    component: login,
  },
  {
    name: "layout",
    path: "/",
    component: layout,
		chil
  },
  {
    name: "404",
    path: "/404",
    component: notfound,
  },
  {
    name: "any",
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
