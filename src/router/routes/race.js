export default [
  {
    path: "/races",
    name: "races",
    component: () => import("@/views/races/RaceList.vue"),
  },
  {
    path: "/races/:id",
    name: "race-details",
    component: () => import("@/views/races/RaceDetails.vue"),
  }
]