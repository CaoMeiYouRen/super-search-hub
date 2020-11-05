import Koa = require('koa')
import queryString = require('query-string')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax } from '@/utils'
import { ImageSoResult } from '../models'

export async function index(ctx: Koa.Context) {
    // thumb 是否使用360图床源，可能会被限制
    const { keyword, limit, thumb } = ctx.query
    if (!keyword) {
        throw new HttpError(400, '提交的搜索内容为空！')
    }
    const result = await ajax('https://image.so.com/j', {
        q: keyword,
        pn: limit
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data: ImageSoResult = result.data
        const channel: RssChannel = new RssChannel({
            title: `${keyword} - 360图片搜索`,
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: '360图片搜索',
            webMaster: 'CaoMeiYouRen',
            item: data?.list?.map(e => {
                const image = thumb ? e.thumb : e.img
                const item = new RssItem({
                    title: e.title,
                    link: e.link,
                    description: e.title,
                    images: [image]
                })
                return item
            }),
            pageSize: data?.list?.length,
            count: data?.total
        })
        ctx.body = channel
    }
}