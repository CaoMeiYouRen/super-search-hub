import Koa = require('koa')
import { RssChannel, RssItem } from '@/models'
import { getBittorrent, rssParserURL } from '@/utils'
const searchTypes = {
    All: 0,
    Anime: 1,
    'Non-English': 10,
    Manga: 3,
    Drama: 8,
    Music: 2,
    'Music Video': 9,
    Raws: 7,
    Hentai: 4,
    'Hentai (Anime)': 12,
    'Hentai (Manga)': 13,
    'Hentai (Games)': 14,
    Batch: 11,
    JAV: 15,
    Other: 5,
}

export async function index(ctx: Koa.Context) {
    const { keyword, search_type, size_min, size_max, username } = ctx.query
    const result = await rssParserURL('https://www.tokyotosho.info/rss.php', {
        terms: keyword,
        searchName: true,
        searchComment: true,
        type: searchTypes[search_type || 'All'],
        size_min,
        size_max,
        username,
    })
    ctx.status = 200
    if (ctx.status === 200) {
        const channel: RssChannel = new RssChannel({
            title: result.title || '',
            link: result.link || '',
            feedUrl: result.feedUrl || '',
            description: result.description || '',
            webMaster: result.webMaster || 'CaoMeiYouRen',
            lastBuildDate: result.lastBuildDate && new Date(result.lastBuildDate),
            ttl: Number(result.ttl),
            language: result.language || 'zh-cn',
            item: result.items?.map(e => {
                const item = new RssItem({
                    title: e.title || '',
                    link: e.link || '',
                    description: e.contentSnippet || '',
                    category: e.categories,
                    pubDate: e.pubDate && new Date(e.pubDate),
                    enclosure_type: 'application/x-bittorrent',
                    enclosure_url: getBittorrent(e.content || ''),
                })
                return item
            }) || [],
        })
        ctx.body = channel
    }
}