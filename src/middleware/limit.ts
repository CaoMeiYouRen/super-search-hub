import Koa = require('koa')
import RateLimit from 'koa2-ratelimit/dist/RateLimit'
import { store } from '@/db'
import { BAN_TIME, DAY_LIMIT_MAX, LIMIT } from '@/config'
import { HttpError, HttpStatusCode } from '@/models'
import { globalCache } from './cache'
/**
 * 限流
 */
export const limiter = RateLimit.middleware({
    interval: { sec: LIMIT.LIMIT_INTERVAL },
    max: LIMIT.LIMIT_MAX,
    message: '请求次数超限; Too many requests, please try again later.',
    store,
    skip(ctx) {
        return ctx.auth
    },
})

// /**
//  * 每日访问量限流
//  */
// export const highLimit = RateLimit.middleware({
//     prefixKey: 'high-limit',
//     interval: { day: 1 },
//     max: DAY_LIMIT_MAX,
//     store,
//     async skip(ctx) {
//         return ctx.auth
//     },
//     async handler(ctx, next) {
//         await globalCache.set(`ip-ban-${ctx.ipv4}`, true, BAN_TIME * 3600)
//         ctx.status = HttpStatusCode.TOO_MANY_REQUESTS
//         ctx.body = { message: '今日请求次数已超限' }
//     },
// })
export async function highLimit(ctx: Koa.Context, next: Koa.Next) {
    if (ctx.auth) {
        await next()
        return
    }
    const prefixKey = 'high-limit-'
    const max = DAY_LIMIT_MAX
    const ip = ctx.ipv4
    // 拉黑ip的情况
    if (await globalCache.get(`ip-ban-${ip}`)) {
        throw new HttpError(HttpStatusCode.BAD_REQUEST, '您已被拉入访问黑名单！')
    }
    const { counter, dateEnd } = await store.incr(prefixKey + ip, { interval: 1000 * 60 * 60 * 24 }, 1)
    if (counter >= max) {
        await globalCache.set(`ip-ban-${ip}`, true, BAN_TIME * 3600)
        throw new HttpError(HttpStatusCode.TOO_MANY_REQUESTS, '今日请求次数已超限')
    }
    await next()
}

