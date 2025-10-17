export default [
  {
    path: "/auth/login",
    name: "auth-login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      resource: "Auth",
      action: "Read",
      redirectIfLoggedIn: true,
      layout: "full",
    },
  },
  {
    path: "/auth/sign-up",
    name: "auth-sign-up",
    component: () => import("@/views/auth/SignUp.vue"),
    meta: {
      resource: "Auth",
      action: "Read",
      redirectIfLoggedIn: true,
      layout: "full",
    },
  },
]
