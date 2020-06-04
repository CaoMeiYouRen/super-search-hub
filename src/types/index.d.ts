import Koa = require('koa')
declare interface KoaCache {
    get(key: string): Promise<any>
    set(key: string, value: any, maxAge?: number): Promise<any>
}
declare module 'koa' {
    interface Context {
        /**
         * 缓存
         *
         * @type {KoaCache}
         */
        cache?: KoaCache
        /**
         * 是否关闭格式化
         *
         * @type {boolean}
         */
        noFormat?: boolean
        /**
         * 是否禁用缓存
         *
         * @type {boolean}
         */
        noCache?: boolean
    }
}