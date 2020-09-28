import Koa = require('koa')
import queryString = require('query-string')
import cheerio = require('cheerio')
import fs = require('fs-extra')
import path = require('path')
import { RssChannel, RssItem } from '@/models'
import { ajax, dateParser, removeHtmlTag } from '@/utils'

export async function index(ctx: Koa.Context) {
    const { keyword } = ctx.query
    const result = await ajax('https://s.weibo.com/article', {
        q: keyword,
        Refer: 'weibo_article',
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data = result.data
        // await fs.writeFile(path.join(__dirname, `./${keyword}_2.html`), data)
        // const $ = cheerio.load(data)
        const $ = cheerio.load(await fs.readFile(path.join(__dirname, `./${keyword}.html`)))
        const list = $('div.card-wrap')

        const channel: RssChannel = new RssChannel({
            title: `${keyword} - 微博文章搜索`,
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: '微博文章搜索',
            webMaster: 'CaoMeiYouRen',
            item: list?.map((i, e) => {
                const f = $(e)
                const item = new RssItem({
                    title: removeHtmlTag(f.find('h3').first().text()).trim(),
                    link: f.find('h3>a').first().attr('href') || '',
                    author: removeHtmlTag(f.find('div').last().find('span').first().text()).replace(/@/, ''),
                    description: removeHtmlTag(f.find('div.content p.txt').first().text()),
                    pubDate: new Date(dateParser(removeHtmlTag(f.find('div').last().find('span').last().text()))),
                })
                return item
            }).get(),
            pageSize: data?.list?.length,
            count: data?.total,
        })
        ctx.body = channel
    }
}