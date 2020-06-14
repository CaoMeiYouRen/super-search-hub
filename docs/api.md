# API介绍

## 盘搜

### 网盘搜索

<Route author="CaoMeiYouRen" example="/pansou/?keyword=888888" path="/pansou/?keyword=keyword" :paramsDesc="['搜索关键词']" />

## 360图片搜索

### 图片搜索

<Route author="CaoMeiYouRen" example="/image.so.com/?keyword=888888" path="/image.so.com/?keyword=keyword&thumb=true" :paramsDesc="['搜索关键词']" />

## bilibili

### 搜索

<Route author="CaoMeiYouRen" example="/bilibili/?keyword=888888&page=1" path="/bilibili/?keyword=keyword&&page=page&sort=sort" :paramsDesc="['搜索关键词']" />

search_type：查询类型。视频：video；番剧：media_bangumi；影视：media_ft；直播：live；专栏：article；话题：topic；用户：bili_user；相簿：photo。默认为video

sort：排序方式, 综合:totalrank 最多点击:click 最新发布:pubdate(缺省) 最多弹幕:dm 最多收藏:stow


## 百度

### 搜索

<Route author="CaoMeiYouRen" example="/baidu/www?keyword=888888" path="/bilibili/?keyword=keyword"  />