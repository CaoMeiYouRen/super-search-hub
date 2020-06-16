import Koa = require('koa')
import queryString = require('query-string')
import cheerio = require('cheerio')
import fs = require('fs-extra')
import path = require('path')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax, removeHtmlTag, restoreUrl } from '@/utils'
import { CACHE, IS_DEBUG } from '@/config'

export default async function (ctx: Koa.Context, next: Koa.Next) {
    const { keyword, page, limit } = ctx.query
    const result = await ajax('https://tieba.baidu.com/f/search/res', {
        qw: keyword,
        pn: page,
    })// , {}, 'GET', {}, 'GBK'
    ctx.status = result.status
    if (ctx.status === 200) {
        const data = result?.data
        const $ = cheerio.load(data)
        const list = $('div.s_post_list>div.s_post')

        const channel: RssChannel = new RssChannel({
            title: `百度贴吧搜索 - ${keyword}`,
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: '百度贴吧搜索',
            webMaster: 'CaoMeiYouRen',
            item: list?.map((i, e) => {
                const f = $(e)
                const item = new RssItem({
                    title: removeHtmlTag(f.find('.p_title').first().text()).trim(),
                    link: restoreUrl(f.find('.p_title>a').first().attr('href') || '', 'https://tieba.baidu.com'),
                    description: removeHtmlTag(f.find('.p_content').first().text()),
                })
                return item
            }).get(),
            count: list?.length,
        })
        ctx.body = channel
    } else {
        const message = IS_DEBUG ? result['stack'] : result['message']
        ctx.body = { message }
    }
}