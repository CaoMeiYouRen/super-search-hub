import Router = require('@koa/router')
import wwwBaidu from './baidu/www'
import bilibili from './bilibili'
import imageSoCom from './image.so.com'
import pansou from './pansou'
import { HttpError } from '@/models'

const router = new Router()

router.use(async (ctx, next) => {
    if (!ctx.query?.keyword) {
        throw new HttpError(400, '提交的搜索内容为空！')
    }
    await next()
})

router.use('/pansou', pansou.routes(), pansou.allowedMethods())

router.use('/image.so.com', imageSoCom.routes(), imageSoCom.allowedMethods())

router.use('/bilibili', bilibili.routes(), bilibili.allowedMethods())

router.use('/baidu/www', wwwBaidu.routes(), wwwBaidu.allowedMethods())

// import weibo from './weibo'
// router.use('/weibo/article', weibo.routes(), weibo.allowedMethods())

export default router