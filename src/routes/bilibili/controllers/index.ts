import Koa = require('koa')
import queryString = require('query-string')
import { HttpError, RssChannel, RssItem } from '@/models'
import { ajax, escape2Html, removeHtmlTag } from '@/utils'
import { ArticleResult, BiliUserResult, BilibiliResult, LiveResult, MediaBangumiResult, PhotoResult, TopicResult, VideoResult } from '../models'

export async function search(ctx: Koa.Context) {
    const { keyword, page, limit, sort = '', search_type = 'video' } = ctx.query
    if (!keyword) {
        throw new HttpError(400, '提交的搜索内容为空！')
    }
    const url = 'https://api.bilibili.com/x/web-interface/search/type'
    const result = await ajax(url, {
        keyword,
        page,
        order: sort,
        search_type,
    })
    ctx.status = result.status
    if (ctx.status === 200) {
        const data: BilibiliResult = result.data
        let item: RssItem[] = []
        switch (search_type) {
            case 'video': {
                const dataResult: VideoResult[] = data?.data?.result
                item = dataResult?.map(e => {
                    const link = `https://www.bilibili.com/video/av${e.aid}`
                    return new RssItem({
                        title: removeHtmlTag(e.title),
                        link,
                        author: e.author,
                        description: `点击: ${e.play}    收藏: ${e.favorites}\n弹幕: ${e.video_review}    评论: ${e.review}\n简介: ${e.description}`,
                        category: e.typename,
                        images: [`https:${e.pic}`],
                        pubDate: new Date(e.pubdate * 1000),
                    })
                })
                break
            }
            case 'media_ft':
            case 'media_bangumi': {
                const dataResult: MediaBangumiResult[] = data?.data?.result
                item = dataResult?.map(e => {
                    const link = e.url
                    return new RssItem({
                        title: removeHtmlTag(e.title),
                        link,
                        description: `${e.desc}\n\ncv:：${e.cv}\n\nstaff：${e.staff}`,
                        category: e.season_type_name,
                        images: [`https:${e.cover}`],
                        pubDate: new Date(e.pubtime * 1000),
                    })
                })
                break
            }
            case 'live': {
                const dataResult: LiveResult = data?.data?.result
                item = dataResult?.live_room?.map(e => {
                    const link = `https://live.bilibili.com/${e.roomid}`
                    return new RssItem({
                        title: removeHtmlTag(e.title),
                        link,
                        author: e.uname,
                        description: `人气值：${e.online}`,
                        category: e.cate_name,
                        images: [`https:${e.user_cover}`],
                        pubDate: new Date(e.live_time),
                    })
                }).slice(0, Math.floor(Number(limit) * 0.8))
                item = item.concat(dataResult?.live_user?.map(e => {
                    const link = `https://live.bilibili.com/${e.roomid}`
                    return new RssItem({
                        title: removeHtmlTag(e.uname),
                        link,
                        author: removeHtmlTag(e.uname),
                        description: e.is_live ? '已开播' : '未开播',
                        category: e.is_live && e.tags ? e.tags.split(',') : undefined,
                        images: [`https:${e.uface}`],
                    })
                }))
                break
            }
            case 'article': {
                const dataResult: ArticleResult[] = data?.data?.result
                item = dataResult?.map(e => {
                    const link = `https://www.bilibili.com/read/cv${e.id}`
                    return new RssItem({
                        title: removeHtmlTag(e.title),
                        link,
                        description: `阅读: ${e.view}    点赞: ${e.like}    评论：${e.reply}\n${e.desc}`,
                        category: e.category_name,
                        images: e.image_urls.map(img => `https:${img}`),
                        pubDate: new Date(e.pub_time * 1000),
                    })
                })
                break
            }

            case 'topic': {
                const dataResult: TopicResult[] = data?.data?.result
                item = dataResult?.map(e => {
                    const link = e.arcurl
                    return new RssItem({
                        title: removeHtmlTag(e.title),
                        link,
                        description: e.description,
                        author: e.author,
                        images: [`https:${e.cover}`],
                        pubDate: new Date(e.update * 1000),
                    })
                })
                break
            }
            case 'bili_user': {
                const dataResult: BiliUserResult[] = data?.data?.result
                item = dataResult?.map(e => new RssItem({
                    title: e.uname,
                    link: `https://space.bilibili.com/${e.mid}`,
                    author: e.uname,
                    description: `等级：${e.level}  关注：${e.fans}   视频数：${e.videos}\n${e.usign}`,
                    images: [`https:${e.upic}`],
                }))
                break
            }
            case 'photo': {
                const dataResult: PhotoResult[] = data?.data?.result
                item = dataResult?.map(e => new RssItem({
                    title: escape2Html(e.title),
                    link: `https://h.bilibili.com/${e.id}`,
                    author: e.uname,
                    description: `浏览: ${e.view}    收藏：${e.like}`,
                    images: [e.cover],
                }))
                break
            }

        }
        const channel = new RssChannel({
            title: `${keyword} - B站搜索`,
            link: `${result.config.url}?${queryString.stringify(result.config.params)}`,
            description: 'B站搜索',
            webMaster: 'CaoMeiYouRen',
            item,
            pageSize: data?.data?.pagesize,
            count: data?.data?.numResults,
        })
        ctx.body = channel
        
    }
}