import { RateLimit, Stores } from 'koa2-ratelimit'
export const limiter = RateLimit.middleware({
    interval: { sec: 60 },
    max: 5, // limit each IP to 100 requests per interval
    message: '请求次数超限; Too many requests, please try again later.',
    store: new Stores.Redis({
        port: 6379,
        host: '127.0.0.1',
        keyPrefix: 'ip-limit-',
    }),
})