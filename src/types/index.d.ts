import Koa = require('koa')
declare interface KoaCache {
    /**
     *
     *
     * @author CaoMeiYouRen
     * @date 2020-06-15
     * @param {string} key
     * @returns {Promise<any>} 返回的数据如果是json格式会自动转换为对象，其余情况为字符串
     */
    get(key: string): Promise<any>
    /**
     *
     * @author CaoMeiYouRen
     * @date 2020-06-04
     * @param {string} key
     * @param {*} value
     * @param {number} [maxAge] 单位：秒
     * @returns {Promise<any>}
     */
    set(key: string, value: any, maxAge?: number): Promise<any>
}
declare module 'koa' {

    interface Request {
        body?: any
        rawBody: string
    }

    interface Context {

        body?: any
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

        /**
         * token是否正确或是否在白名单内
         *
         * @type {boolean}
         */
        auth?: boolean
        /**
         * ipv4
         *
         * @type {string}
         */
        ipv4?: string

        query: {
            /**
             * 查询内容
             *
             * @type {string}
             */
            keyword?: string
            /**
             * 返回格式(json/xml)，默认为json
             *
             * @type {string}
             */
            type?: string
            /**
             * 第几页结果，默认为1
             *
             * @type {number}
             */
            page?: number
            /**
             * 条数限制，默认为10
             *
             * @type {number}
             */
            limit?: number
            /**
             * 过滤参数，将在返回结果的基础上进行过滤
             *
             * @type {string}
             */
            filter?: string
            /**
             * 排序方式
             *
             * @type {string}
             */
            sort?: string
            /**
             * 是否禁用缓存，默认启用缓存(false)
             *
             * @type {boolean}
             */
            noCache?: boolean
            /**
             * 是否禁用缓存，默认启用缓存(false)
             *
             * @type {boolean}
             */
            nocache?: boolean
            /**
             * 持有token可以不限流
             *
             * @type {string}
             */
            token?: string
            [key: string]: any
        }
    }
}

declare module '*.art'