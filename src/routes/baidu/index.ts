import Router = require('@koa/router')
import www from './controllers/www'
import tieba from './controllers/tieba'

const router = new Router()
router.get('/www', www)
router.get('/tieba', tieba)

export default router