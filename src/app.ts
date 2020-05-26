import Koa = require('koa')
import Router = require('koa-router')
import Logger = require('koa-logger')
import bodyParser = require('koa-bodyparser')
import favicon = require('koa-favicon')
import { responseFormat, responseTime, timeout, catchError, limiter, appLogger } from './middleware'
import routes from './routes'
import { ROOT_URL } from './config'

const app = new Koa()

const router = new Router()

app.proxy = true

app.use(appLogger)

app.use(responseTime)

app.use(responseFormat)

app.use(catchError)

app.use(timeout)

app.use(limiter)

app.use(bodyParser())

// 加载路由
router.use(ROOT_URL, routes.routes(), routes.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

export { app }