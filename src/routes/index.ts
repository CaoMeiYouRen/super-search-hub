import Router = require('koa-router')
import { notFound, test, index } from '@/controllers'

const router = new Router()

// 根路径
router.all('/', index)

// 测试路由
router.all('/test/:status?', test)

// router.use('')
// 处理404
router.all('*', notFound)

export default router