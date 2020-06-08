import path = require('path')
import fs = require('fs-extra')
import Koa = require('koa')
import cheerio = require('cheerio')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax } from '@/utils'
import { IS_DEBUG, CACHE } from '@/config'
import { BilibiliResult } from '../models'

// const $ = cheerio.load(fs.readFileSync(path.join(__dirname, './index.html')))
/**
const $ = cheerio.load(result.data)
        const channel: RssChannel = new RssChannel({
            title: 'B站搜索',
            link: 'https://search.bilibili.com/all',
            description: 'B站搜索',
            webMaster: 'CaoMeiYouRen',
            item: $('.video-list > .video-item').map((i, e) => {
                const f = $(e)
                const title = f.children('a').first().attr('title') || ''
                const link = (`https:${f.children('a').first().attr('href')}` || '').replace('?from=search', '')
                const description = (f.find('.des').first().text() || '').trim()
                const item = new RssItem({
                    title,
                    link,
                    description,
                    guid: link,
                })
                return item
            }).get().slice(0, limit),
        })
 */
// console.log(JSON.stringify(text, null, 4))


export async function search(ctx: Koa.Context, next: Koa.Next) {
    const { keyword, page, limit, order } = ctx.query
    if (!keyword) {
        throw new HttpError(400, '提交的搜索内容为空！')
    }
    const url = 'https://api.bilibili.com/x/web-interface/search/type'
    const result = await ajax(url, {
        keyword,
        page,
        search_type: 'video',
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data: BilibiliResult = result.data
        const channel: RssChannel = new RssChannel({
            title: 'B站搜索',
            link: url,
            description: 'B站搜索',
            webMaster: 'CaoMeiYouRen',
            item: data?.data?.result?.map(e => {
                return new RssItem({
                    title: e.title?.replace(/<[^>]*>/g, ''),
                    link: e.arcurl,
                    description: e.description,
                    guid: e.arcurl,
                    pubDate: new Date(e.pubdate * 1000),
                })
            }),
        })
        ctx.body = channel
    } else {
        let message = IS_DEBUG ? result['stack'] : result['message']
        ctx.body = { message }
    }
}