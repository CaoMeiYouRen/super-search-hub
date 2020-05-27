import Koa = require('koa')
import Router = require('koa-router')
import Logger = require('koa-logger')
import bodyParser = require('koa-bodyparser')
import favicon = require('koa-favicon')
import mount from 'koa-mount'
import cors = require('@koa/cors')
import {
    responseFormat, responseTime, timeout, catchError, limiter,
    appLogger, cache, requestTransform,
} from './middleware'
import routes from './routes'
import { ROOT_URL } from './config'

const app = new Koa()
const router = new Router()

app.proxy = true
app.use(responseTime)
app.use(appLogger)
app.use(responseFormat)
app.use(catchError)
app.use(timeout)
app.use(bodyParser())
app.use(limiter)
app.use(cors())
app.use(cache)
app.use(requestTransform)
// 加载路由
router.use(ROOT_URL, routes.routes(), routes.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// console.log(router.stack)
export { app }