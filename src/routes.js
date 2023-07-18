import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Blog from "./views/Blog.vue";
import SingleBlog from "./views/SingleBlog.vue";
import Service from "./views/Service.vue";
import Doctor from "./views/Doctor.vue";
import SingleService from "./views/SingleService.vue";
import Contact from "./views/Contact.vue";
import Page from "./views/Page.vue";

const routers = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      title: "About",
    },
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
    meta: {
      title: "Blog",
    },
  },
  {
    path: "/blog/:slug",
    name: "singleBlog",
    component: SingleBlog,
  },
  {
    path: "/service",
    name: "service",
    component: Service,
    meta: {
      title: "Service",
    },
  },
  {
    path: "/service/:slug",
    name: "singleService",
    component: SingleService,
  },
  {
    path: "/doctors",
    name: "doctor",
    component: Doctor,
    meta: {
      title: "Doctor",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
    meta: {
      title: "Contact",
    },
  },

  {
    path: "/p/:slug",
    name: "page",
    component: Page,
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: (to) => {
      return { path: "/" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

router.beforeEach((to, from, next) => {
  if (to.params.slug) {
    document.title = `${to.params.slug}`;
    return next();
  } else {
    document.title = `${to.meta.title}`;
  }
  window.scrollTo(0, 0);
  next();
});

export default router;
