import path = require('path')
import fs = require('fs-extra')
import Koa = require('koa')
import cheerio = require('cheerio')
import queryString = require('query-string')
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
        const channel = new RssChannel({
            title: 'B站搜索',
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: 'B站搜索',
            webMaster: 'CaoMeiYouRen',
            item: data?.data?.result?.map(e => {
                return new RssItem({
                    title: e.title?.replace(/<[^>]*>/g, ''),
                    link: `https://www.bilibili.com/video/av${e.aid}`,
                    author: e.author,
                    description: `点击: ${e.play}    收藏: ${e.favorites}\n弹幕: ${e.video_review}    评论: ${e.review}\n简介: ${e.description}`,
                    guid: e.arcurl,
                    images: [`https:${e.pic}`],
                    pubDate: new Date(e.pubdate * 1000),
                })
            }).slice(0, limit),
            pageSize: data?.data?.result?.length,
            count: data?.data?.numResults,
        })
        ctx.body = channel
    } else {
        const message = IS_DEBUG ? result['stack'] : result['message']
        ctx.body = { message }
    }
}