import Koa = require('koa')
import queryString = require('query-string')
import cheerio = require('cheerio')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax, removeHtmlTag } from '@/utils'
async function getBaiduCookie(ctx: Koa.Context) {
    let Cookie: string = await ctx.cache?.get('baidu-cookie')
    if (!Cookie) {
        const result = await ajax('https://www.baidu.com/')
        if (result.headers['set-cookie'] && result.headers['set-cookie'][0]) {
            Cookie = result.headers['set-cookie'][0]
            await ctx.cache?.set('baidu-cookie', Cookie, 3600 * 24 * 365 * 10)
        }
    }
    return Cookie
}
export default async function(ctx: Koa.Context) {
    const { keyword } = ctx.query
    if (!keyword) {
        throw new HttpError(400, '提交的搜索内容为空！')
    }
    const Cookie = await getBaiduCookie(ctx) ?? ''
    const result = await ajax('https://www.baidu.com/s', {
        wd: keyword,
    }, {}, 'GET', {
        Cookie,
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data = result.data
        // await fs.writeFile(path.join(__dirname, `./${keyword}_2.html`), data)
        // const $ = cheerio.load(await fs.readFile(path.join(__dirname, `./${keyword}.html`)))
        const $ = cheerio.load(data)
        const list = $('div.c-container.result')

        const channel: RssChannel = new RssChannel({
            title: `${keyword} - 百度搜索`,
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: '百度搜索',
            webMaster: 'CaoMeiYouRen',
            item: list?.map((i, e) => {
                const f = $(e)
                const item = new RssItem({
                    title: removeHtmlTag(f.children('h3').text()).trim(),
                    link: f.find('h3.t>a').first().attr('href') || '',
                    description: removeHtmlTag(f.find('div.c-abstract').first().text()),
                })
                return item
            }).get(),
            count: list?.length,
        })
        ctx.body = channel
    }
}