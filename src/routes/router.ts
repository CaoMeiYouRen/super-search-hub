import Router = require('@koa/router')
import { HttpError } from '@/models'
import baidu from './baidu'
import bilibili from './bilibili'
import imageSoCom from './image.so.com'
import pansou from './pansou'
import kisssub from './kisssub'
import tokyotosho from './tokyotosho'

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

router.use('/baidu', baidu.routes(), baidu.allowedMethods())

router.use('/kisssub', kisssub.routes(), kisssub.allowedMethods())

router.use('/tokyotosho', tokyotosho.routes(), tokyotosho.allowedMethods())

// import weibo from './weibo'
// router.use('/weibo/article', weibo.routes(), weibo.allowedMethods())

export default router