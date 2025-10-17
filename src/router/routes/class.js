export default [
  {
    path: "/classes",
    name: "classes",
    component: () => import("@/views/classes/ClassList.vue"),
  },
  {
    path: "/classes/:id",
    name: "class-details",
    component: () => import("@/views/classes/ClassDetails.vue"),
  }
]