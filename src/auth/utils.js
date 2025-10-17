import store from "@/store"
import auth from "@/auth/auth"

// Return if user is logged in
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = async() => {
  if (auth.initialised === false) {
    await auth.refreshCurrentUser()
  }

  if (store.state.user.currentUser === null) {
    return false
  }
  return store.state.user.currentUser && store.state.user.accessToken
}
