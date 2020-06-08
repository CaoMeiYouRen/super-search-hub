import Router = require('@koa/router')
const router = new Router()

import cmyr from './cmyr'
router.use('/cmyr', cmyr.routes(), cmyr.allowedMethods())

import pansou from './pansou'
router.use('/pansou', pansou.routes(), pansou.allowedMethods())

import imageSoCom from './image.so.com'
router.use('/image.so.com', imageSoCom.routes(), imageSoCom.allowedMethods())


import bilibili from './bilibili'
router.use('/bilibili', bilibili.routes(), bilibili.allowedMethods())


export default router