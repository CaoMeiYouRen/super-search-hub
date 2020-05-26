import RateLimit from 'koa2-ratelimit/dist/RateLimit'
import { store } from '@/db'
import { LIMIT, TOKEN } from '@/config'

export const limiter = RateLimit.middleware({
    interval: { sec: LIMIT.LIMIT_INTERVAL },
    max: LIMIT.LIMIT_MAX,
    message: '请求次数超限; Too many requests, please try again later.',
    store,
    skip(ctx) {
        return ctx.query?.token && ctx.query?.token === TOKEN
    },
})