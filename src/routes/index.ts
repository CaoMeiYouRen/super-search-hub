import Router = require('koa-router')
import { HttpError } from '@/models'
import { sleep, timeFormat } from '@/utils'
const router = new Router()

router.all('/', (ctx, next) => {
    ctx.status = 200
    ctx.body = {
        message: 'Welcome to super-search-hub',
    }
})
// 测试路由
router.all('/test/:status?', (ctx, next) => {
    ctx.status = Number(ctx.params?.status || ctx.query?.status || ctx.request.body?.status || 200)
    // console.log(ctx.url)
    console.log(ctx.params)
    console.log(ctx.query)
    console.log(ctx.request.body)
    ctx.body = {
        message: 'Welcome to super-search-hub',
        data: {
            params: ctx.params,
            query: ctx.query,
            body: ctx.request.body,
        },
    }
})

router.all('/error', (ctx, next) => {
    throw new HttpError(400, '测试异常')
})
router.all('/error2', (ctx, next) => {
    throw new Error('出现了异常')
})
router.all('/timeout', async (ctx, next) => {
    await sleep(2000)
})

router.all('/cache', async (ctx, next) => {
    ctx.body = {
        text: '启用缓存',
        date: timeFormat(),
    }
})

// 处理404
router.all('*', (ctx, next) => {
    throw new HttpError(404, `Cannot ${ctx.method} ${ctx.path}`)
})
export default router