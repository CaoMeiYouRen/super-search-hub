export class Rec_tags {
}
/**
 * 视频
 *
 * @author CaoMeiYouRen
 * @date 2020-06-12
 * @export
 * @class VideoResult
 */
export class VideoResult {
    type: string
    id: number
    author: string
    mid: number
    typeid: string
    typename: string
    arcurl: string
    aid: number
    bvid: string
    title: string
    description: string
    arcrank: string
    pic: string
    play: number
    video_review: number
    favorites: number
    tag: string
    review: number
    pubdate: number
    senddate: number
    duration: string
    badgepay: boolean
    hit_columns: string[]
    view_type: string
    is_pay: number
    is_union_video: number
    rec_tags: Rec_tags
    new_rec_tags: any
    rank_score: number
}
