import { RateLimit, Stores } from 'koa2-ratelimit'
import { redis } from '@/db'

export const limiter = RateLimit.middleware({
    interval: { sec: 60 },
    max: 30,
    message: '请求次数超限; Too many requests, please try again later.',
    store: redis,
})