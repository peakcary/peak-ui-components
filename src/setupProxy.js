const {
  createProxyMiddleware
} = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://10.120.59.28:8107/",
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": ""
      // }
    })
  )
}