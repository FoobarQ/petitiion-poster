import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Petition from "../views/Petition.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/petitions/:id",
    name: "Petition",
    component: Petition,
    meta: {
      title: "Track ePetition",
    },
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

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle && to.params.id) {
    document.title = `${nearestWithTitle.meta.title} #${
      to.params.id || ""
    } - Petition Tracker`;
  } else {
    document.title = "Petition Tracker";
  }

  next();
});

export default router;
