import Store from 'koa2-ratelimit/dist/Store'
import { Stores } from 'koa2-ratelimit'
import { REDIS_CONFIG, CACHE } from '@/config'
import { printTime, Log } from '@/utils'

let store: Store = new Store()
if (CACHE.CACHE_TYPE === CACHE.CACHE_TYPE_MEMORY) {
    store = new Stores.Memory()

} else if (CACHE.CACHE_TYPE === CACHE.CACHE_TYPE_REDIS) {
    store = new Stores.Redis({
        port: REDIS_CONFIG.REDIS_PORT,
        host: REDIS_CONFIG.REDIS_HOST,
        keyPrefix: REDIS_CONFIG.REDIS_KEY_PREFIX,
        password: REDIS_CONFIG.REDIS_PASSWORD,
    })
    Log.log('redis 连接成功')
}

export { store }

