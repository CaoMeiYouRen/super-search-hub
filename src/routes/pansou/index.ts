import Router = require('koa-router')
import { index } from './controllers'
const router = new Router()

router.get('/', index)

export default router