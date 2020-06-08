
export class CostTime {
    params_check: string;
    illegal_handler: string;
    as_response_format: string;
    as_request: string;
    save_cache: string;
    deserialize_response: string;
    as_request_format: string;
    total: string;
    main_handler: string;
}

export class ExpList {
    5510: boolean;
    6699: boolean;
}

export class Rec_tags {
}

export class Result {
    type: string;
    id: number;
    author: string;
    mid: number;
    typeid: string;
    typename: string;
    arcurl: string;
    aid: number;
    bvid: string;
    title: string;
    description: string;
    arcrank: string;
    pic: string;
    play: number;
    video_review: number;
    favorites: number;
    tag: string;
    review: number;
    pubdate: number;
    senddate: number;
    duration: string;
    badgepay: boolean;
    hit_columns: string[];
    view_type: string;
    is_pay: number;
    is_union_video: number;
    rec_tags: Rec_tags;
    new_rec_tags: any;
    rank_score: number;
}

export class BilibiliData {
    seid: string;
    page: number;
    pagesize: number;
    numResults: number;
    numPages: number;
    suggest_keyword: string;
    rqt_type: string;
    cost_time: CostTime;
    exp_list: ExpList;
    egg_hit: number;
    result: Result[];
    show_column: number;
}

export class BilibiliResult {
    code: number;
    message: string;
    ttl: number;
    data: BilibiliData;
}

