import VueRouter from "vue-router"

import {isUserLoggedIn} from "@/auth/utils"
import {canNavigate} from "@/libs/acl/routeProtection"

// Routes
import auth from "@/router/routes/auth"
import race from "@/router/routes/race"
import classRoutes from "@/router/routes/class"
import subclass from "@/router/routes/subclass"
import character from "@/router/routes/character"

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home/Home.vue"),
    },
    ...auth,
    ...character,
    ...classRoutes,
    ...subclass,
    ...race,
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'Read',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
      resource: 'Auth',
      action: 'Read',
    },
  ],
})


router.beforeEach(async(to, _, next) => {
  const isLoggedIn = await isUserLoggedIn()
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({name: "auth-login"})
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next("/")
  }

  return next()
})


export default router
