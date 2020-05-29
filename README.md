# super-search-hub 

![build status](https://travis-ci.com/CaoMeiYouRen/super-search-hub.svg?branch=master)

设计参考：[RSSHub](https://github.com/DIYgod/RSSHub)

设计目标：

-   将任何能搜索的网页的搜索结果处理成标准的RSS规范格式。
-   同时支持json和xml。
-   返回结果以json优先，xml通过转换产生
-   目标并不是支持RSS阅读器，而是将搜索结果转换为一种统一的格式，方便进行二次开发。仅参考RSS规范进行设计
-   项目的dist文件应当可以在node.js环境下直接运行，无需其他依赖【除redis缓存外】


# 开发流程

## 启动

```sh
npm start
```

## 开发环境

-   Node.js 12 //后续也将尽量使用tls的版本

## 开发

```sh
npm i
npm run dev
```

## 编译

```sh
npm run build
```

## 风格检查

```sh
npm run lint
```

## 文档开发

```sh
npm run docs:dev
```

## 文档编译

```sh
npm run docs:build
```

## 提交变更

```sh
npm run commit #请勿直接提交git commit
```