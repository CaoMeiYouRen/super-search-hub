import dotenv = require('dotenv')
import path = require('path')
import fs = require('fs-extra')
let envParsed = {}
// 载入本地变量
if (fs.existsSync('.env.local')) {
    const envFound = dotenv.config({ path: '.env.local' })
    if (envFound.error) {
        console.error(envFound.error)
    } else {
        envParsed = Object.assign({}, envFound.parsed)
    }
}
if (fs.existsSync('.env')) {
    const envFound = dotenv.config()
    if (envFound.error) {
        console.error(envFound.error)
    } else {
        envParsed = Object.assign(envFound.parsed, envParsed)
    }
}
const env = process.env

/**
 * 是否为debug
 */
export const IS_DEBUG = env.NODE_ENV === 'development'

if (IS_DEBUG) {
    console.log(envParsed)
}

// 运行端口
export const PORT = Number(env.PORT || 4365)
// 路由根路径
export const ROOT_URL = env.ROOT_URL || ''
// 启用多线程
export const ENABLE_CLUSTER = env.ENABLE_CLUSTER === 'true'
// 超时时间
export const TIMEOUT_MAX_AGE = Number(env.TIMEOUT_MAX_AGE || 15000)

/**
 * 访问token
 */
export const TOKEN = env.TOKEN || ''
/**
* IP黑白名单
 */
export const IP_CONFIG = {
    IP_WHITELIST: (env.IP_WHITELIST || '').split(','),
    IP_BLACKLIST: (env.IP_BLACKLIST || '').split(','),
}
/**
 * 启用访问控制
 */
export const ENABLE_ACCESS_CONTROL = Boolean(TOKEN || IP_CONFIG.IP_WHITELIST.length || IP_CONFIG.IP_BLACKLIST.length)

export const ITEM_LIMIT = Number(env.ITEM_LIMIT || 10)

export const DAY_LIMIT_MAX = Number(env.DAY_LIMIT_MAX ?? 1000)

export const BAN_TIME = Number(env.BAN_TIME ?? 24)

/**
 * 限流配置
 */
export const LIMIT = {
    LIMIT_INTERVAL: Number(env.LIMIT_INTERVAL || 60),
    LIMIT_MAX: Number(env.LIMIT_MAX || 30),
}

export const STATIC_MAX_AGE = Number(env.STATIC_MAX_AGE || 0)

/**
 * 缓存类型
 */
const CACHE_TYPE = env.CACHE_TYPE || 'memory'
export const CACHE = {
    CACHE_TYPE,
    CACHE_AGE: Number(env.CACHE_AGE || 300),
    CACHE_MAX: Number(env.CACHE_MAX || Infinity),
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

/**
 * 是否阻止爬虫
 */
export const DISALLOW_ROBOT = Boolean(env.DISALLOW_ROBOT)

/**
 * 时区
 */
export const TZ = env.TZ || ''
/**
 * 是否启用推送
 */
export const ENABLE_PUSH = !IS_DEBUG && Boolean(env.DINGTALK_ACCESS_TOKEN)
/**
 * 钉钉配置
 */
export const DINGTALK = {
    DINGTALK_ACCESS_TOKEN: env.DINGTALK_ACCESS_TOKEN || '',
    DINGTALK_SECRET: env.DINGTALK_SECRET || '',
}