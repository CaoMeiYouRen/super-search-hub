import Koa = require('koa')
import queryString = require('query-string')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax } from '@/utils'
import { PansouResult } from '../models'

export async function index(ctx: Koa.Context) {
    const { keyword, page } = ctx.query
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
            title: `${keyword} - 网盘搜索`,
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: '网盘搜索',
            webMaster: 'CaoMeiYouRen',
            item: data?.list?.data?.map(e => {
                const item = new RssItem({
                    title: e.title,
                    link: e.link,
                    description: e.des,
                })
                return item
            }),
            pageSize: data?.list?.data?.length,
            count: data?.list?.count,
        })
        ctx.body = channel
    }
}