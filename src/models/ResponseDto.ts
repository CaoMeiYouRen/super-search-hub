import { RssChannel } from './Rss'

export class ResponseDto {
    /**
     * 响应状态码
     *
     * @type {number}
     */
    statusCode: number
    /**
     * 消息说明
     *
     * @type {string}
     */
    message?: string
    /**
     * 状态码>=400时的http status
     *
     * @type {string}
     */
    error?: string
    /**
     * 返回的数据
     *
     * @type {RssChannel}
     */
    data?: RssChannel
}
