<h1 align="center">super-search-hub </h1>
<p>
  <a href="https://travis-ci.com/CaoMeiYouRen/super-search-hub" target="_blank">
    <img alt="build" src="https://travis-ci.com/CaoMeiYouRen/super-search-hub.svg?branch=master" />
  </a>
   <a href="https://codecov.io/github/CaoMeiYouRen/super-search-hub?branch=master" target="_blank">
    <img alt="Test coverage" src="https://img.shields.io/codecov/c/github/CaoMeiYouRen/super-search-hub.svg?style=flat-square" />
  </a>
  <img alt="Version" src="https://img.shields.io/badge/version-1.3.8-blue.svg?cacheSeconds=2592000" />
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

> 将任何能搜索的网页的搜索结果处理成一种统一的格式

## ✨ Demo

部署案例 [https://searchhub.cmyr.icu/](https://searchhub.cmyr.icu/)

### 🏠 [主页](https://github.com/CaoMeiYouRen/super-search-hub#readme)

## 项目简介

#### 设计参考和灵感来源：[RSSHub](https://github.com/DIYgod/RSSHub)

#### 设计目标：

-   将任何能搜索的网页的搜索结果处理成标准的RSS规范格式。
-   同时支持json和xml。
-   返回结果以json优先，xml通过转换产生
-   目标并不是支持RSS阅读器，而是将搜索结果转换为一种统一的格式，方便进行二次开发。仅参考RSS规范进行设计
-   本项目应当方便部署，项目的dist文件应当可以在node.js环境下直接运行，无需其他依赖【除redis缓存外】

#### 开发这个项目的原因

-   对于杂七杂八的搜索结果感到厌烦，希望能整一个统一的格式
-   真实原因是对于”搜索机器人“这个项目感到无力，在不使用编程的情况下觉得太难处理了，为此模仿RssHub产生了这个项目


## 依赖要求

- node >= 12

## 安装

```sh
npm i
npm run build
```

## 🚀使用

```sh
npm start
```

## 作者


👤 **CaoMeiYouRen**

* Website: [https://blog.cmyr.ltd](https://blog.cmyr.ltd)
* GitHub: [@CaoMeiYouRen](https://github.com/CaoMeiYouRen)

## 🤝贡献

欢迎Contributions, issues and feature!

如有问题请查看 [issues page](https://github.com/CaoMeiYouRen/super-search-hub/issues).

贡献代码请查看[加入我们](https://github.com/CaoMeiYouRen/super-search-hub/tree/master/docs/joinus)

## 支持

如果觉得这个项目有用的话请给一颗⭐️，非常感谢

**[赞助和支持](https://github.com/CaoMeiYouRen/super-search-hub/tree/master/docs/support)**

## 📝 License

Copyright © 2020 [CaoMeiYouRen](https://github.com/CaoMeiYouRen).<br />
This project is [MIT](https://github.com/CaoMeiYouRen/super-search-hub/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
