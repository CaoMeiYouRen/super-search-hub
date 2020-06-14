# 介绍

<p>
   <a href="https://github.com/CaoMeiYouRen/super-search-hub" target="_blank">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/CaoMeiYouRen/super-search-hub">
  </a>
  <a href="https://travis-ci.com/CaoMeiYouRen/super-search-hub" target="_blank">
    <img alt="build" src="https://travis-ci.com/CaoMeiYouRen/super-search-hub.svg?branch=master" />
  </a>
   <a href="https://codecov.io/github/CaoMeiYouRen/super-search-hub?branch=master" target="_blank">
    <img alt="Test coverage" src="https://img.shields.io/codecov/c/github/CaoMeiYouRen/super-search-hub.svg?style=flat-square" />
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D12-blue.svg" />
  <a href="https://github.com/CaoMeiYouRen/super-search-hub#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/super-search-hub/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CaoMeiYouRen/super-search-hub/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/CaoMeiYouRen/super-search-hub" />
  </a>
</p>

设计参考和灵感来源：[RSSHub](https://github.com/DIYgod/RSSHub)

设计目标：

-   将任何能搜索的网页的搜索结果处理成标准的RSS规范格式。
-   同时支持json和xml。
-   返回结果以json优先，xml通过转换产生
-   目标并不是支持RSS阅读器，而是将搜索结果转换为一种统一的格式，方便进行二次开发。仅参考RSS规范进行设计
-   本项目应当方便部署，项目的dist文件应当可以在node.js环境下直接运行，无需其他依赖【除redis缓存外】

开发这个项目的原因

-   对于杂七杂八的搜索结果感到厌烦，希望能整一个统一的格式
-   真实原因是对于”搜索机器人“这个项目感到无力，在不使用编程的情况下觉得太难处理了，为此模仿（copy）RSSHub产生了这个项目
-   我对于 RSSHub 使用纯 JavaScript 开发感到脑壳疼，没有类型提示真的很难开发大型项目。所以才决定用TypeScript写一个新的项目。

### 待完成的路由

-   bilibili [√]
-   百度 [√]
-   贴吧
-   微博
-   爱恋动漫
-   动漫花园
-   知网
-   360图片搜索 [√]
-   动漫之家
-   萌娘百科
-   码云
-   Google
-   Youtube
-   GitHub
-   pixiv
-   Twitter
-   Facebook
-   ……（暂时只想到这么多，以后有空再补）