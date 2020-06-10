import Koa = require('koa')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax } from '@/utils'
import { PansouResult } from '../models'
import { IS_DEBUG, CACHE } from '@/config'

export async function index(ctx: Koa.Context, next: Koa.Next) {
    const { keyword, page, limit } = ctx.query
    if (!keyword) {
        throw new HttpError(400, '提交的搜索内容为空！')
    }
    const result = await ajax('http://106.15.195.249:8011/search_new', {
        q: keyword,
        p: page,
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data: PansouResult = result.data
        const channel: RssChannel = new RssChannel({
            title: '网盘搜索',
            link: 'http://www.pansou.com/',
            description: '网盘搜索',
            webMaster: 'CaoMeiYouRen',
            item: data?.list?.data?.map(e => {
                const item = new RssItem({
                    title: e.title,
                    link: e.link,
                    description: e.des,
                    guid: e.link,
                })
                return item
            }).slice(0, limit),
            pageSize: data?.list?.data?.length,
            count: data?.list?.count,
        })
        ctx.body = channel
    } else {
        const message = IS_DEBUG ? result['stack'] : result['message']
        ctx.body = { message }
    }
}