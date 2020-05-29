import Store from 'koa2-ratelimit/dist/Store'
import MemoryStore from 'koa2-ratelimit/dist/MemoryStore'
import RedisStore from 'koa2-ratelimit/dist/RedisStore'

import { REDIS_CONFIG, CACHE } from '@/config'
import { printTime, Log } from '@/utils'
import { CacheType } from '@/models'

let store: Store = new Store()
if (CACHE.CACHE_TYPE === CacheType.MEMORY) {
    store = new MemoryStore()
} else if (CACHE.CACHE_TYPE === CacheType.REDIS) {
    store = new RedisStore({
        port: REDIS_CONFIG.REDIS_PORT,
        host: REDIS_CONFIG.REDIS_HOST,
        keyPrefix: REDIS_CONFIG.REDIS_KEY_PREFIX,
        password: REDIS_CONFIG.REDIS_PASSWORD,
    })
    Log.log('redis 连接成功')
}

export { store }

