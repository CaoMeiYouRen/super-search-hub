# API介绍

## 盘搜

### 网盘搜索

<Route author="CaoMeiYouRen" :example="{keyword:'斗破苍穹'}" path="/pansou" />

## 360图片搜索

### 图片搜索

<Route author="CaoMeiYouRen" :example="{keyword:'动漫',thumb:true}"  path="/image.so.com" :query="['keyword','thumb']" :queryDesc="['搜索关键词','是否使用360图床源']"/>


## bilibili

### 搜索
<Route author="CaoMeiYouRen"  :example="{keyword:'辉夜大小姐想让我告白',search_type:'video'}" path="/bilibili"  :query="['keyword','search_type','sort']" :queryDesc="['搜索关键词','查询类型。视频：video；番剧：media_bangumi；影视：media_ft；直播：live；专栏：article；话题：topic；用户：bili_user；相簿：photo。默认为video','排序方式, 综合:totalrank 最多点击:click 最新发布:pubdate(缺省) 最多弹幕:dm 最多收藏:stow']" />


## 百度

### 搜索

<Route author="CaoMeiYouRen" :example="{keyword:'天气'}"  path="/baidu/www"/>


### 贴吧

<Route author="CaoMeiYouRen" :example="{keyword:'李毅吧'}"  path="/baidu/tieba"  />


## 爱恋动漫

### 搜索

<Route author="CaoMeiYouRen" :example="{keyword:'超电磁炮'}" path="/kisssub"  />


## Tokyo Toshokan

### 搜索

<Route author="CaoMeiYouRen" :example="{keyword:'Sakamoto Desu ga'}" path="/tokyotosho" :query="['keyword','search_type','size_min','size_max','username']" :queryDesc="['搜索关键词','搜索类型：All, Anime, Non-English, Manga, Drama, Music, Music Video, Raws, Hentai, Hentai (Anime), Hentai (Manga), Hentai (Games), Batch, JAV, Other','最大值','最小值','用户名']"/>
