import store from "@/store"
import jwtConfig from "./jwtConfig"

export default class AuthService {
    // store the User
    store = null;

    ability = null;

    initialised = false;

    // Will be used by this service for making API calls
    axiosIns = null;

    // jwtConfig <= Will be used by this service
    jwtConfig = {...jwtConfig};

    // For Refreshing Token
    isAlreadyFetchingAccessToken = false;

    // For Refreshing Token
    subscribers = [];

    constructor(axiosIns) {
      this.axiosIns = axiosIns
      this.jwtConfig = {...this.jwtConfig}

      this.store = store

      // Request Interceptor
      this.axiosIns.interceptors.request.use(
        config => {
          const accessToken = this.getToken()

          // If token is present add it to request's Authorization PageHeader
          if (accessToken) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
          }
          return config
        },
        error => Promise.reject(error)
      )

      // Add request/response interceptor
      this.axiosIns.interceptors.response.use(
        response => response,
        error => {
          // const { config, response: { status } } = error
          const {config, response} = error

          const originalRequest = config
          try {
            // If it's a 401 (potential token timeout) and we're not on an endpoint related to auth, then try refreshing
            if (
              response &&
                        response.status === 401 &&
                        originalRequest.url.startsWith("/auth/") === false &&
                        originalRequest.url.startsWith("/two-factor/") === false
            ) {
              if (!this.isAlreadyFetchingAccessToken) {
                this.isAlreadyFetchingAccessToken = true
                this.refreshCurrentUser().then(
                  () => {
                    this.onAccessTokenFetched(this.getToken())
                  },
                  () => {
                  }
                )
              }
              return new Promise(resolve => {
                this.addSubscriber(accessToken => {
                  originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
                  resolve(this.axiosIns(originalRequest))
                })
              })
            }
          } catch (err) {
            // console.log(err)
          }

          return Promise.reject(error)
        }
      )
    }

    async refreshCurrentUser() {
      try {
        const r = await this.refreshToken()
        this.isAlreadyFetchingAccessToken = false
        this.setToken(r.data.access_token)
        this.setCurrentUser(r.data.user_data)
      } catch (_) {
      } finally {
        this.initialised = true
      }
    }

    logout() {
      this.axiosIns.get(this.jwtConfig.logoutEndpoint)
      this.store.dispatch("user/clearUser")
    }

    onAccessTokenFetched(accessToken) {
      this.subscribers = this.subscribers.filter(callback =>
        callback(accessToken)
      )
    }

    addSubscriber(callback) {
      this.subscribers.push(callback)
    }

    getToken() {
      return this.store.state.user.accessToken
    }

    setToken(value) {
      this.store.commit("user/SET_ACCESS_TOKEN", value)
    }

    getCurrentUser() {
      return this.store.state.user.currentUser
    }

    setCurrentUser(userData) {
      this.store.commit("user/SET_CURRENT_USER", userData)
    }

    login(...args) {
      return this.axiosIns.post(this.jwtConfig.loginEndpoint, ...args)
    }

    forgotPassword(...args) {
      return this.axiosIns.post(this.jwtConfig.forgotPasswordEndpoint, ...args)
    }

    resetPassword(...args) {
      return this.axiosIns.post(this.jwtConfig.resetPasswordEndpoint, ...args)
    }

    register(...args) {
      return this.axiosIns.post(this.jwtConfig.registerEndpoint, ...args)
    }

    refreshToken() {
      return this.axiosIns.get(this.jwtConfig.refreshEndpoint)
    }
}
