const path = require('path')

module.exports = {
  publicPath: "/",
  devServer: {
    host: 'localdnd.com'
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@core': path.resolve(__dirname, 'src/@core'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
  transpileDependencies: true,
}
