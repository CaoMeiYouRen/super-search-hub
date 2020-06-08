import Koa = require('koa')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax } from '@/utils'

import { IS_DEBUG, CACHE } from '@/config'
import { ImageSoResult } from '../models'

export async function index(ctx: Koa.Context, next: Koa.Next) {
    const { keyword, page, limit } = ctx.query
    if (!keyword) {
        throw new HttpError(400, '提交的搜索内容为空！')
    }
    const result = await ajax('https://image.so.com/j', {
        q: keyword,
        pn: limit,
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data: ImageSoResult = result.data
        const channel: RssChannel = new RssChannel({
            title: '360图片搜索',
            link: 'https://image.so.com/j',
            description: '360图片搜索',
            webMaster: 'CaoMeiYouRen',
            item: data?.list?.map(e => {
                let item = new RssItem({
                    title: e.title,
                    link: e.link,
                    description: e.title,
                    guid: e.link,
                    images: [e.img],
                })
                return item
            }).slice(0, limit),
            count: data?.total,
        })
        ctx.body = channel
    } else {
        let message = IS_DEBUG ? result['stack'] : result['message']
        ctx.body = { message }
    }
}