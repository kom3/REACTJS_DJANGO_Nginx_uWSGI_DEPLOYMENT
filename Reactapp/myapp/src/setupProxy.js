//1. CORS PROXY: TO AVOID CORS ERROR IN DEVELOPMENT SERVER(CORS ERROR OCCURS WHEN BACKEND AND FRONTEND
//SERVERS ARE RUNNING IN DIFFERENT VIRTUAL HOSTS LIKE localhost:5655 and localhost:3000) USE THIS PROXY
//2. THIS PROXY ALSO ENSURES THE EASY MODIFICTION OF BASE URL  (AT ONLY ONE PLACE, LINE NO 15)
 



const {createProxyMiddleware} = require("http-proxy-middleware")
// const streamify = require('stream-array');
const http = require("http")
var keepAliveAgent = new http.Agent({keepAlive: true})
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5655",
            changeOrigin: true,
            agent: keepAliveAgent,
            // ws: true,
            xfwd: true,
            pathRewrite: {
                "^/api": "/",
            },
        })
    )
}