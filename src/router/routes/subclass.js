export default [
  {
    path: "/subclasses/:classId/:subclassId",
    name: "subclass-details",
    component: () => import("@/views/subclasses/SubclassDetails.vue"),
  }
]