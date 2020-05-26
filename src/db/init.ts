import Store from 'koa2-ratelimit/dist/Store'
import { Stores } from 'koa2-ratelimit'
import { REDIS_CONFIG } from '@/config'
export const redis: Store = new Stores.Redis({
    port: REDIS_CONFIG.REDIS_PORT,
    host: REDIS_CONFIG.REDIS_HOST,
    keyPrefix: REDIS_CONFIG.REDIS_KEY_PREFIX,
    password: REDIS_CONFIG.REDIS_PASSWORD,
})
