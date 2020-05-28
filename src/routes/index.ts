import Router = require('koa-router')
import path = require('path')
import fs = require('fs-extra')
import router from './router'
import { notFound, test, index } from '@/controllers'

const routes = new Router()

// 根路径
routes.all('/', index)

routes.all('/status', index)

// 测试路由
routes.all('/test/:status?', test)

routes.use('', router.routes(), router.allowedMethods())

// console.log(router.stack)

// 处理404
routes.all('*', notFound)

export default routes