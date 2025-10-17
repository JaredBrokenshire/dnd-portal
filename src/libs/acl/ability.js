import store from "@/store"
import { Ability } from "@casl/ability"
import { initialAbility } from "./config"

let userData = null
if (store.state.user.accessToken) {
  userData = store.state.user.accessToken
}

const existingAbility = userData ? userData.permissions : null

export default new Ability(existingAbility || initialAbility)
