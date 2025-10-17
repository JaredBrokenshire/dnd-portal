import Vue from "vue"
import Vuex from "vuex"

// Modules
import user from "@/store/modules/userModule"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
  },
  strict: process.env.DEV,
})
