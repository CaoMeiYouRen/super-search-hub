import Koa = require('koa')
import cheerio = require('cheerio')
import queryString = require('query-string')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax, cacheAjax, removeHtmlTag, restoreUrl } from '@/utils'
import { CACHE, IS_DEBUG } from '@/config'
async function getBt(url: string) {
    const result: string = await cacheAjax(url, {}, 3600 * 24)
    if (!result) {
        return ''
    }
    const reg = /<a id="magnet" href="(.*?)">/m
    const temp = result.match(reg)
    return (temp && temp[1]) ?? ''
}

export async function index(ctx: Koa.Context, next: Koa.Next) {
    const { keyword, page, limit } = ctx.query

    const result = await ajax('http://www.kisssub.org/search.php', {
        keyword,
        page,
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data = result?.data
        const $ = cheerio.load(data)
        const list = $('#data_list>tr')
        const channel: RssChannel = new RssChannel({
            title: `${keyword} - 爱恋动漫BT下载`,
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: '爱恋动漫BT下载',
            webMaster: 'CaoMeiYouRen',
            item: list?.map((i, e) => {
                const f = $(e)
                const link = `https://www.kisssub.org${f.find('td[style="text-align:left;"]>a').first().attr('href') || ''}`
                const item = new RssItem({
                    title: removeHtmlTag(f.find('td[style="text-align:left;"]>a').first().text()).trim(),
                    author: removeHtmlTag(f.find('td').last().text()),
                    link,
                    description: `大小：${f.find('td').eq(3).text().trim()}\t种子：${f.find('td').eq(4).text().trim()}\n下载：${f.find('td').eq(5).text().trim()}\t完成：${f.find('td').eq(6).text().trim()}`,
                    pubDate: new Date(removeHtmlTag(f.find('td').first().text())),
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