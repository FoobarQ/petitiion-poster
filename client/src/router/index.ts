import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Petition from "../views/Petition.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/petitions/:id",
    name: "Petition",
    component: Petition,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/p/:id", redirect: { name: "Petition" } },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
