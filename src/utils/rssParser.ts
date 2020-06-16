import Parser = require('rss-parser')
import queryString = require('query-string')
export const rssParser = new Parser()
export async function rssParserURL(url: string, query?: any) {
    return rssParser.parseURL(`${url}?${queryString.stringify(query)}`)
}