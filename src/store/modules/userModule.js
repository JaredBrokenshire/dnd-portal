export default {
  namespaced: true,
  state: {
    currentUser: null,
    profilePicture: null,
    accessToken: null,
  },
  getters: {
    currentUser: state => state.currentUser,
    accessToken: state => state.accessToken,
  },
  mutations: {
    SET_CURRENT_USER(state, value) {
      state.currentUser = value
    },
    SET_ACCESS_TOKEN(state, value) {
      state.accessToken = value
    },
  },
  actions: {
    clearUser({commit}) {
      commit("SET_CURRENT_USER", null)
      commit("SET_ACCESS_TOKEN", null)
    },
  },
}
