export class RssItem {
    /**
     * 此项的标题
     *
     * @type {string}
     */
    title: string
    /**
     * 指向此项的超链接
     *
     * @type {string}
     */
    link: string
    /**
     * 描述此项
     *
     * @type {string}
     */
    description: string
    /**
     * 唯一标识符
     *
     * @type {string}
     */
    guid?: string
    /**
     * 最后发布时间
     *
     * @type {Date}
     */
    pubDate?: Date
    /**
     * 图片数组
     *
     * @type {string[]}
     */
    images?: string[]

    constructor(data?: RssItem) {
        Object.assign(this, data)
    }
}

export class RssChannel {
    /**
     * 频道的标题
     *
     * @type {string}
     */
    title: string
    /**
     * 指向频道的超链接
     *
     * @type {string}
     */
    link: string
    /**
     * 频道描述
     *
     * @type {string}
     */
    description: string
    /**
     * 内容子项
     *
     * @type {RssItem[]}
     */
    item: RssItem[]

    /**
     * item最大数量
     *
     * @type {number}
     */
    count?: number

    /**
     * feed 内容的最后修改日期
     *
     * @type {(Date | string)}
     */
    lastBuildDate?: Date | string
    /**
     * 管理员邮箱 或 GitHub用户名
     *
     * @type {string}
     */
    webMaster?: string
    /**
     * 语言
     *
     * @type {string}
     */
    language?: string
    /**
     * 指定从 feed 源更新此 feed 之前，feed 可被缓存的分钟数
     *
     * @type {number}
     */
    ttl?: number

    constructor(data?: RssChannel) {
        Object.assign(this, data)
    }

}