import path = require('path')
import fs = require('fs-extra')
import Koa = require('koa')
import Router = require('@koa/router')
import bodyParser = require('koa-bodyparser')
import cors = require('@koa/cors')
import serve from 'koa-static'
import cacheControl from 'koa-cache-control'
import {
    responseFormat, responseTime, timeout, catchError, limiter,
    appLogger, cache, requestTransform, requestIpTransform, accessControl,
} from './middleware'
import routes from './routes'
import { ROOT_URL, CACHE, STATIC_MAX_AGE } from './config'

const app = new Koa()
const router = new Router()

app.proxy = true
app.use(responseTime)
app.use(requestIpTransform)
app.use(appLogger)
app.use(responseFormat)
app.use(catchError)
app.use(timeout)
app.use(cors())
app.use(bodyParser())
app.use(accessControl)
app.use(limiter)
if (fs.pathExistsSync(path.join(__dirname, '../public'))) {
    // 文档并非必须，如果有则挂载
    app.use(serve(path.join(__dirname, '../public'), {
        maxAge: STATIC_MAX_AGE * 1000,
    }))
}
app.use(cacheControl({
    maxAge: CACHE.CACHE_AGE,
}))
app.use(cache)
app.use(requestTransform)
// 加载路由
router.use(ROOT_URL, routes.routes(), routes.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// console.log(router.stack)
export { app }