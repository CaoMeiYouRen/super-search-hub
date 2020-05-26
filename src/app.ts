import Koa = require('koa')
import Router = require('koa-router')
import Logger = require('koa-logger')
import bodyParser = require('koa-bodyparser')
import status = require('http-status')
import _ = require('lodash')
import './models'
import { ROOT_URL } from './config'
import { Log, timeFormat } from './utils'
import { responseFormat, responseTime, timeout, catchError, limiter, appLogger } from './middleware'
import routes from './routes'
const app = new Koa()

app.proxy = true

app.use(appLogger)

app.use(responseTime)

app.use(responseFormat)

app.use(catchError)

app.use(timeout)

app.use(limiter)

app.use(bodyParser())

// 加载路由
app.use(routes.routes()).use(routes.allowedMethods())

export { app }