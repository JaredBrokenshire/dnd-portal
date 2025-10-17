export default {
  // Endpoints
  loginEndpoint: "/auth/login",
  registerEndpoint: "/does-not-exist",
  refreshEndpoint: "/auth/refresh",
  logoutEndpoint: "/auth/logout",
  forgotPasswordEndpoint: "/auth/forgot-password",
  resetPasswordEndpoint: "/auth/reset-password",

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
}
