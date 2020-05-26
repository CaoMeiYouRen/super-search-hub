import Koa = require('koa')
declare interface KoaCache {
    get(key: string): Promise<any>
    set(key: string, value: any, maxAge?: number): Promise<any>
}
declare module 'koa' {
    interface Context {
        cache?: Cache
    }
}