import Koa = require('koa')
import art from 'art-template'
import xml2js = require('xml2js')
import { RssChannel } from '@/models'

const template_xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"
{{ if itunes_author }}
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
{{ else if item && item.some((i) => i.media) }}
  xmlns:media="http://search.yahoo.com/mrss/"
{{ /if }}
>
    <channel>
        <title><![CDATA[{{@ title || 'Super Search Hub' }}]]></title>
        <link>{{ link || 'https://searchhub.cmyr.icu' }}</link>
        <atom:link href="{{ atomlink }}" rel="self" type="application/rss+xml" />
        <description><![CDATA[{{@ description || title }} - Made with love by Super-Search-Hub(https://github.com/CaoMeiYouRen/super-search-hub)]]></description>
        <generator>Super Search Hub</generator>
        <webMaster>{{ webMaster || 'CaoMeiYouRen'}}</webMaster>
        {{ if itunes_author }}<itunes:author>{{ itunes_author}}</itunes:author>{{ /if }}
        {{ if itunes_category }}<itunes:category text="{{ itunes_category }}"/>{{ /if }}
        {{ if itunes_author }}<itunes:explicit>{{ itunes_explicit || 'clean' }}</itunes:explicit>{{ /if }}
        <language>{{ language || 'zh-cn' }}</language>
        {{ if image }}
        <image>
            <url>{{ image }}</url>
            <title><![CDATA[{{@ title || 'Super Search Hub' }}]]></title>
            <link>{{ link }}</link>
        </image>
        {{ /if }}
        <lastBuildDate>{{ lastBuildDate }}</lastBuildDate>
        <ttl>{{ ttl }}</ttl>
        {{ each item }}
        <item>
            <title><![CDATA[{{@ $value.title }}]]></title>
            <description><![CDATA[{{@ $value.description || $value.title }}]]></description>
            {{ if $value.pubDate }}<pubDate>{{ $value.pubDate }}</pubDate>{{ /if }}
            <guid isPermaLink="false">{{ $value.guid || $value.link || $value.title }}</guid>
            <link>{{ $value.link }}</link>
            {{ if $value.itunes_item_image }}<itunes:image href="{{ $value.itunes_item_image }}"/>{{ /if }}
            {{ if $value.enclosure_url }}<enclosure url="{{ $value.enclosure_url }}" {{ if $value.enclosure_length }}length="{{ $value.enclosure_length }}"{{ /if }} {{ if $value.enclosure_type }}type="{{ $value.enclosure_type }}"{{ /if }} />{{ /if }}
            {{ if itunes_author && $value.itunes_duration }}<itunes:duration>{{ $value.itunes_duration }}</itunes:duration> {{ /if }}
            {{ if $value.author }}<author><![CDATA[{{ $value.author }}]]></author>{{ /if }}
            {{ if typeof $value.category === 'string' }}
            <category>{{ $value.category }}</category>
            {{ else }}
                {{ each $value.category $c }}
                <category>{{ $c }}</category>
                {{ /each }}
            {{ /if }}
            {{ if $value.media }}
                {{ each $value.media $tag }}
                <media:{{ $index }}
                {{ each $tag $data }}
                {{ $index }}="{{ $data }}"
                {{ /each }}
                ></media:{{ $index }}>
                {{ /each }}
            {{ /if }}
        </item>
        {{ /each }}
    </channel>
</rss>`
/**
 * 渲染为xml格式的数据
 *
 * @author CaoMeiYouRen
 * @date 2020-06-08
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function template(ctx: Koa.Context, next: Koa.Next) {
    await next()
    const type = ctx.query.type || 'json'
    if (type === 'xml') {
        if (ctx.body.data) {
            ctx.type = 'xml'
            const data: RssChannel = ctx.body.data
            if (data.lastBuildDate instanceof Date) {
                data.lastBuildDate = data.lastBuildDate.toISOString()
            }
            data.description = data.description.replace(/\r\n/g, '\n').replace(/\n/g, '<br/>')
            data.item = data.item.map(e => {
                if (e.images) {
                    e.description += `\n${e.images?.map(m => {
                        return `<img src="${m}" referrerpolicy="no-referrer">`
                    }).join('\n')}`
                }
                e.description = e.description.replace(/\r\n/g, '\n').replace(/\n/g, '<br/>')
                if (e.pubDate instanceof Date) {
                    e.pubDate = e.pubDate.toISOString()
                }
                return e
            })
            const xml = art.render(template_xml, ctx.body.data, { escape: true })
            // let obj = await xml2js.parseStringPromise(xml, {})
            // // console.log(JSON.stringify(obj, null, 4))
            // let builder = new xml2js.Builder()
            // xml = builder.buildObject(obj)
            ctx.body = xml.replace(/(\n[\s|\t]*\r*\n)/g, '\n')
        }

    }
}