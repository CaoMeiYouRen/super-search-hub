export class LiveRoom {
    rank_offset: number;
    uid: number;
    tags: string;
    hit_columns: string[];
    live_time: string;
    cate_name: string;
    live_status: number;
    uname: string;
    uface: string;
    user_cover: string;
    short_id: number;
    area: number;
    type: string;
    title: string;
    cover: string;
    online: number;
    rank_index: number;
    rank_score: number;
    roomid: number;
    attentions: number;
}

export class LiveUser {
    rank_offset: number;
    uid: number;
    tags: string;
    type: string;
    live_time: string;
    hit_columns: string[];
    live_status: number;
    area: number;
    is_live: boolean;
    uname: string;
    uface: string;
    rank_index: number;
    rank_score: number;
    roomid: number;
    attentions: number;
}

/* Result*/
export class LiveResult {
    live_room: LiveRoom[];
    live_user: LiveUser[];
}


