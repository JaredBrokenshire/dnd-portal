import axiosIns from "@/libs/axios"
import AuthService from "@/auth/AuthService"

const auth = new AuthService(axiosIns)
export default auth
