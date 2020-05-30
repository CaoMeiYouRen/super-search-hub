---
sidebar: auto
---

# 部署

由于个人服务器的性能和带宽都十分有限，因此本项目推荐自行部署。如有疑问请上[issues](https://github.com/CaoMeiYouRen/super-search-hub/issues)提问

部署涉及到以下基本编程常识:

1. 命令行操作
1. [Git](https://git-scm.com/)
1. [Node.js](https://nodejs.org/)
1. [npm](https://www.npmjs.com/get-npm) 或 [yarn](https://yarnpkg.com/zh-Hans/docs/install)

部署到可外网访问则可能涉及到:

1. [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
1. [Docker](https://www.docker.com/get-started) 或 [docker-compose](https://docs.docker.com/compose/install/)
1. [Redis](https://redis.io/download)

## Docker Compose 部署

本项目十分推荐使用Docker Compose部署。Docker Compose部署默认使用redis作为缓存。

### 安装

下载 [docker-compose.yml](https://github.com/CaoMeiYouRen/super-search-hub/blob/master/docker-compose.yml)

```bash
wget https://raw.githubusercontent.com/CaoMeiYouRen/super-search-hub/master/docker-compose.yml
```

启动

```sh
docker-compose up -d
```

### 更新

删除旧容器

```bash
docker-compose down
```

然后重复安装步骤

### 添加配置

修改 docker-compose.yml 中的 `environment` 进行配置

## Docker 部署

本项目第二推荐的是使用docker手动部署

### 安装

运行下面的命令下载 super-search-hub 镜像

```bash
docker pull caomeiyouren/super-search-hub
```

然后运行 super-search-hub 即可

```bash
docker run -d --name super-search-hub -p 8080:8080 caomeiyouren/super-search-hub
```

在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)，即可访问

您可以使用下面的命令来关闭 RSSHub

```bash
docker stop super-search-hub
```

### 更新

删除旧容器

```bash
docker stop super-search-hub
docker rm super-search-hub
```

然后重复安装步骤

### 添加配置

配置运行在 docker 中的 super-search-hub，最便利的方法是使用 docker 环境变量

以设置缓存时间为 1 小时举例，只需要在运行时增加参数: `-e CACHE_AGE=3600`

```bash
docker run -d --name super-search-hub -p 1200:1200 -e CACHE_AGE=3600 caomeiyouren/super-search-hub
```

该部署方式不包括 redis 依赖，如有需要请改用 Docker Compose 部署方式或自行部署外部依赖

更多配置项请看 [#配置](#配置)

## 手动部署

部署 `super-search-hub` 最直接的方式，您可以按照以下步骤将 `super-search-hub` 部署在您的电脑、服务器或者其他任何地方

### 运行环境要求

-   Node.js >= 12 
    -   本项目开发环境为 Node 12.14.0
    -   编译环境（travis-ci）为 Node 12.17.0【保持Node 12 的最新版】
    -   运行环境（Docker）为 Node 12.15.0 【为保持Docker环境一致被锁定版本】
    -   所以请尽量在Node 12 环境下使用。后续也将随Node tls 版本的更新而更新（即tls大版本更新本项目也将跟进）
    -   Node.js多版本管理推荐使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows)

### 安装

首先是下载 `super-search-hub`的源码

```bash
git clone https://github.com/CaoMeiYouRen/super-search-hub.git
cd super-search-hub
```

下载完成后，需要安装依赖

使用 `npm`

```bash
npm install
```

或 `yarn`

```bash
yarn
```

由于众所周知的原因，在中国使用 `npm` 下载依赖十分缓慢，建议挂一个代理或者考虑使用 [NPM 镜像](https://npm.taobao.org/)

执行编译

```sh
npm run build
#或
yarn run build
```

然后在 `super-search-hub` 文件夹中运行下面的命令就可以启动

```bash
npm start
```

或

```bash
yarn start
```

或使用 [PM2](https://pm2.io/doc/zh/runtime/quick-start/)

```bash
pm2 start dist/index.js --name  super-search-hub
```

在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

详细使用说明参照 [指南](https://searchhub.cmyr.icu/)，替换所有路由例子中的 `https://searchhub.cmyr.icu/` 为 `http://localhost:8080/` 即可正常使用

### 添加配置

可以通过设置环境变量来配置 RSSHub

在项目根目录新建一个 `.env` 文件，每行以 `NAME=VALUE` 格式添加环境变量，例如

```ini
CACHE_TYPE=redis
CACHE_EXPIRE=600
```

注意它不会覆盖已有的环境变量，更多规则请参考 [dotenv](https://github.com/motdotla/dotenv)

该部署方式不包括 redis 依赖，如有需要请改用 Docker Compose 部署方式或自行部署外部依赖

更多配置项请看 [#配置](#pei-zhi)

### 更新

在 `RSSHub` 文件夹中运行下面的命令就从 github 仓库拉取最新版本

```bash
git pull
```

然后重复安装步骤

## 配置

通过设置环境变量来配置 super-search-hub

<<< @/.env

