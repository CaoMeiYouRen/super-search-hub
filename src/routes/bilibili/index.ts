import Router = require('@koa/router')
import { search } from './controllers'
const router = new Router()

router.get('/', search)

export default router