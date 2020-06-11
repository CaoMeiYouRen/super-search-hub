export class MediaScore {
    user_count: number
    score: number
}

export class Eps {
    id: number
    cover: string
    title: string
    url: string
    release_date: string
    badges: any
    index_title: string
    long_title: string
}
/**
 * 番剧
 *
 * @author CaoMeiYouRen
 * @date 2020-06-12
 * @export
 * @class MediaBangumiResult
 */
export class MediaBangumiResult {
    media_id: number
    season_id: number
    type: string
    title: string
    org_title: string
    cover: string
    media_type: number
    areas: string
    styles: string
    cv: string
    staff: string
    play_state: number
    goto_url: string
    desc: string
    corner: number
    pubtime: number
    media_mode: number
    is_avid: boolean
    fix_pubtime_str: string
    media_score: MediaScore
    hit_columns: string[]
    all_net_name: string
    all_net_icon: string
    all_net_url: string
    angle_title: string
    angle_color: number
    display_info: any
    hit_epids: string
    pgc_season_id: number
    season_type: number
    season_type_name: string
    selection_style: string
    ep_size: number
    url: string
    button_text: string
    is_follow: number
    is_selection: number
    eps: Eps[]
    badges: any
}
