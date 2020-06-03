import Router = require('@koa/router')
const router = new Router()

import cmyr from './cmyr'
router.use('/cmyr', cmyr.routes(), cmyr.allowedMethods())

import pansou from './pansou'

router.use('/pansou', pansou.routes(), pansou.allowedMethods())

export default router