import Router = require('@koa/router')
import path = require('path')
import fs = require('fs-extra')
import router from './router'
import { index, notFound, robots, status, test } from '@/controllers'

const routes = new Router()

// 根路径
routes.all('/', index)

routes.all('/status', status)

routes.get('/robots.txt', robots)

// 测试路由
routes.all('/test/:status?', test)

routes.use('', router.routes(), router.allowedMethods())

// 处理404
routes.all('*', notFound)

export default routes