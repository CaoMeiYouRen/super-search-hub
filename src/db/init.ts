// import { Store, MemoryStore, RedisStore } from 'koa2-ratelimit'
import Store from 'koa2-ratelimit/dist/Store'
import MemoryStore from 'koa2-ratelimit/dist/MemoryStore'
import RedisStore from 'koa2-ratelimit/dist/RedisStore'

import { REDIS_CONFIG, CACHE } from '@/config'
import { printTime, Log } from '@/utils'

let store: Store = new Store()
if (CACHE.CACHE_TYPE === CACHE.CACHE_TYPE_MEMORY) {
    store = new MemoryStore()

} else if (CACHE.CACHE_TYPE === CACHE.CACHE_TYPE_REDIS) {
    store = new RedisStore({
        port: REDIS_CONFIG.REDIS_PORT,
        host: REDIS_CONFIG.REDIS_HOST,
        keyPrefix: REDIS_CONFIG.REDIS_KEY_PREFIX,
        password: REDIS_CONFIG.REDIS_PASSWORD,
    })
    Log.log('redis 连接成功')
}

export { store }

