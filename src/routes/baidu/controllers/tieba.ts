import Koa = require('koa')
import queryString = require('query-string')
import cheerio = require('cheerio')
import { RssChannel, RssItem } from '@/models'
import { ajax, removeHtmlTag, restoreUrl } from '@/utils'

export default async function(ctx: Koa.Context) {
    const { keyword, page } = ctx.query
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
    }
}