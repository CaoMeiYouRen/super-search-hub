# API介绍

## 盘搜

### 网盘搜索

<Route author="CaoMeiYouRen" :example="{keyword:888888}" path="/pansou" />

## 360图片搜索

### 图片搜索

<Route author="CaoMeiYouRen" :example="{keyword:888888,thumb:true}"  path="/image.so.com" :query="['keyword','thumb']" :queryDesc="['搜索关键词','是否使用360图床源']"/>


## 百度

### 搜索

<Route author="CaoMeiYouRen" :example="{keyword:888888}"  path="/baidu/www"/>

### 贴吧

<Route author="CaoMeiYouRen" :example="{keyword:888888}"  path="/baidu/tieba"  />


## 爱恋动漫

### 搜索

<Route author="CaoMeiYouRen" :example="{keyword:'超电磁炮'}" path="/kisssub"  />
