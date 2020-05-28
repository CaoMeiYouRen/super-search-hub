import dotenv = require('dotenv')
import path = require('path')
import fs = require('fs-extra')
if (fs.existsSync('.env')) {
    const envFound = dotenv.config()
    if (envFound.error) {
        console.error(envFound.error)
    } else {
        if (process.env.NODE_ENV === 'development') {
            console.log(envFound.parsed)
        }
    }
}
const env = process.env
/**
 * 是否为debug
 */
export const IS_DEBUG = env.NODE_ENV === 'development'
// 运行端口
export const PORT = Number(env.PORT || 8080)
// 路由根路径
export const ROOT_URL = env.ROOT_URL || ''
// 超时时间
export const TIMEOUT_MAX_AGE = Number(env.TIMEOUT_MAX_AGE || 15000)

/**
 * 访问token
 */
export const TOKEN = env.TOKEN || ''

export const ITEM_LIMIT = Number(env.ITEM_LIMIT || 10)
/**
 * 限流配置
 */
export const LIMIT = {
    LIMIT_INTERVAL: Number(env.LIMIT_INTERVAL || 60),
    LIMIT_MAX: Number(env.LIMIT_MAX || 30),
}

export const STATIC_MAX_AGE = Number(env.STATIC_MAX_AGE || 0)

/**
 * 内存缓存
 */
const CACHE_TYPE_MEMORY = 'memory'
/**
 * redis缓存
 */
const CACHE_TYPE_REDIS = 'redis'
/**
 * 缓存类型
 */
const CACHE_TYPE = env.CACHE_TYPE || CACHE_TYPE_MEMORY
export const CACHE = {
    CACHE_TYPE,
    CACHE_AGE: Number(env.CACHE_AGE || 300),
    CACHE_MAX: Number(env.CACHE_MAX || Infinity),
    CACHE_TYPE_MEMORY,
    CACHE_TYPE_REDIS,
}

const REDIS_PORT = Number(env.REDIS_PORT || 6379)
const REDIS_HOST = env.REDIS_HOST || '127.0.0.1'
/**
 * redis配置
 */
export const REDIS_CONFIG = {
    REDIS_URL: env.REDIS_URL || `redis://${REDIS_HOST}:${REDIS_PORT}`,
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD: env.REDIS_PASSWORD || '',
    REDIS_KEY_PREFIX: env.REDIS_KEY_PREFIX || 'my-redis',
}
/**
 * 浏览器 user-agent
 */
export const UA = env.UA || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'

