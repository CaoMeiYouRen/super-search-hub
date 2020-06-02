---
sidebar: auto
---

# 参与我们

如果有任何想法或需求，可以在 [issue](https://github.com/CaoMeiYouRen/super-search-hub/issues) 中告诉我们，同时我们欢迎各种 pull requests

## 参与讨论

1.  [GitHub Issues](https://github.com/CaoMeiYouRen/super-search-hub/issues)

## 开发新路由

**建议仔细阅读本文档后再进行路由开发。**

**强烈建议阅读[开发技巧](#开发技巧)**

### 技术栈要求

本人假定你已经掌握以下技术的使用

-   Node.js [**必须**]
-   JavaScript [**必须**]
-   Koa2 [**必须**]
-   Markdown [**必须**]
-   Git [**必须**]
-   TypeScript [**可选**]
-   ES2019 [**可选**]
-   Redis [**可选**]
-   ……

### 开发环境

-   Node.js >= 12.17.0
    -   后续也将同步更新到 lts 版本，届时请及时更新自己的开发环境
    -   Node.js多版本管理推荐使用 [nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows)

-   TypeScript >= 3.9.3
    -   请优先使用 [TypeScript](https://www.typescriptlang.org/) 进行开发。如果你觉得自己并不会使用TypeScript，那么没有关系，你只需要按照JavaScript的写法来写就行。因为TypeScript是JavaScript的超集，所以所有的JavaScript代码都是合法的TypeScript代码
    -   本人使用TypeScript开发的原因是我看到了JavaScript在多人合作上的缺陷。JavaScript缺乏类型导致在开发上有诸多不便，没有类型提示会导致多人合作的困难

### 调试

```sh
npm i
npm run dev
```

启动后请在浏览器中打开 [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

访问 [http://127.0.0.1:8080/status](http://127.0.0.1:8080/status) 可查看运行状态

### 路由规范约定

在`src/routes`下添加新建路由。路由需符合以下规范约定

-   文件夹以目标网站主域名命名，在不混淆的情况下不包含顶级域名。
-   如果需要取子域名则在主域名文件夹下再划分
    -   例如 www.baidu.com 命名为 baidu
    -   例如 tieba.baidu.com 在 baidu 文件夹下面，可命名为tieba
    -   若要区分 example.com 和 example.cn ，则需包含顶级域名
        -   但是先建的文件夹可以不包含顶级域名
-   文件夹下必须有 index.ts 
    -   index.ts 中只允许挂载子路由，业务逻辑请在其他文件完成
        -   若业务逻辑过多请自行划分模块
        -   模块划分请参考 [开发技巧](#开发技巧) 下的 使用约定文件夹命名
    -   路由一律采用默认导出的形式，即`export default router`
-   路由一律在`routes/router.ts`文件中挂载
    -   路由名称同文件夹名称，若文件夹名称为` example`，则挂载路由为`router.use('/example', example.routes(), example.allowedMethods())`

对于使用的query参数，请遵从以下约定

### 通用参数约定

-   keyword: string 查询内容。原则上必须有keyword
-   type: string [可选] 返回格式(json/xml)，默认为json
-   page: number [可选] 第几页结果，默认为1
-   limit: number  [可选] 条数限制，默认为10
-   filter:string  [可选] 过滤参数，将在返回结果的基础上进行过滤
-   sort: string  [可选]  排序方式
-   nocache: boolean [可选]  是否禁用缓存，默认启用缓存(false)
-   token: string  [可选] 持有token可以不限制接口调用次数

### 返回数据格式约定

返回的数据格式需遵从`src/models/Rss.ts`下的`RssChannel`类和`RssItem `类的规范。

出于数据格式化的需求，请务必使用 RssChannel 类的构造函数来生成结果，即。

```ts
const channel: RssChannel = new RssChannel({})
```

### 获取源数据

本项目使用 [axios](https://github.com/axios/axios) 来发起http请求。

在`src/utils/ajax.ts`文件夹下已经封装好`ajax`函数，可以直接使用

### 处理源数据

1.  如果源数据为 json 则直接处理即可
2.  如果源数据为 HTML 则使用 [cheerio](https://github.com/cheeriojs/cheerio) 进行处理
    -   cheerio 选择器与 jquery 选择器几乎相同。参考 cheerio 文档：[https://cheerio.js.org/](https://cheerio.js.org/)

### 开发技巧

开发技巧属于推荐规范而非必须遵守的规范，但遵守该规范能让你的开发更加简单，也更容易和其他人合作

-   使用约定文件夹命名
    -   config 配置。路由文件一般不太需要单独的配置文件，如有需要可以合并到`src/config`下
    -   controllers 控制器。主要编写路由，允许在逻辑简单时直接在controllers中写业务逻辑
    -   middleware 中间件。
    -   models 数据模型。
        -   如果源数据返回的数据为json格式，请尽可能编写一个数据模型类。
        -   原因是如果有后来人想修改这个接口的数据，有数据模型会十分方便
        -   如果数据模型发生变化，改动起来也比较方便
    -   services 业务逻辑
    -   utils 工具类
    -   test 单元测试文件
    -   本约定对于`src`和`src/routes`下的子路由都适用
    -   如果你认为部分修改适用于全局，则可以直接写在src下面对应的目录
    
-   模块解耦
    -   config 文件夹作为配置模块禁止导入其他模块的内容
        -   仅本项目编写的的模块，若为处理数据要求，可以引入npm模块，但尽可能少
    -   utils 文件夹存放工具函数，应当为纯粹的逻辑，不得有处理业务逻辑和I/O等情况
    
-   使用路径别名而不是相对路径。
    -   本项目使用了`module-alias`来设置模块别名，`@`指向`src`目录
    -   例如调用`src/utils/ajax.ts`，无论路由层级有多深，都可以使用`@/utils/ajax`直接引入
    
-   使用缓存

    -   在Koa2中间件中的 `ctx`参数上挂载了缓存`cache`，使用缓存可以提高性能，减少源站访问次数。

    -   例如 

        ```ts
        export async function cache(ctx: Koa.Context, next: Koa.Next) {
            let key = await ctx.cache.get('key') //使用 get 获取
            await ctx.cache.set('key', '123456') //使用 set 设置
        }
        ```

    -   关于 key 的命名在此统一规范，key均以该路由文件夹名称为开头
        
        -   例如 `example` 路由文件夹下使用缓存时，key可以命名为 `example-xxxx` ，确保全局不重复

-   使用 HttpError 来抛出异常

    -   本项目已专门编写了 HttpError 用于抛出 http相关的异常。在业务逻辑中可以直接抛出，后续会被异常拦截后返回给客户端
    -   例如  `throw new HttpError(400, '提交的搜索内容为空！') `

-   使用 async/await 而不是回调函数
    
    -   async/await 是 Promise 的一个语法糖，可以像同步函数那样编写异步函数，非常建议使用
    
-   使用可选链而不是 `&&`
    -   使用 `obj?.item`而不是`obj && obj.item`
    -   你可能会疑惑这是什么语法，这是es11的新语法，当可选链中有一个为undefined或unll时就返回undefined而不是报错。
    -   当然这个语法的兼容性还不是很好，因此TypeScript的编译目标也设置为es2019
    
-   适度使用箭头函数和三元表达式
    
    -   箭头函数和三元表达式可以简化代码，但如果使用过多反而会造成逻辑混乱
    -   禁止在一行逻辑中写多个三元表达式，如有需要请拆成多行
    
-   请尽可能的使用 TypeScript 支持的新语法
    
    -   新语法会在很大程度上带来更加简洁的写法，也会更加方便
    -   如果新语法兼容性较差请慎用
    
-   在表达清晰的情况下尽可能写注释
    -   没有注释的代码看起来简直让人头疼，所以请尽可能编写注释
    -   但是也不要写太多注释，那样也很头疼
    -   注释表达清晰即可，部分常识性代码就无需多做解释了
    
-   编写单元测试
    -   由于目标接口并非百分百可用的，所以不对端对端测试做要求（e2e test）
    -   但我认为单元测试（unit test）还是十分有必要的。对于业务逻辑和工具类函数尽可能进行测试，这有助于代码的健壮性
    -   单元测试文件请使用 *.test.ts 或 *.spec.ts 后缀

### 实例演示

以 **盘搜** 接口为例演示具体开发流程

1.  在`routes`文件夹下新建`pansou`文件夹，并新建index.ts

2.  新建 `controllers`文件夹用于编写业务逻辑

3.  经过抓包发现pansou使用的是`http://106.15.195.249:8011/search_new`这个接口，主要参数为`q`查询内容和`p`第几页

4.  分析返回数据格式，在pansou下新建models，编写数据模型 `PansouResult`

5.  获取查询参数，使用`ajax`函数发起请求

    ```ts
    const { keyword, page, limit } = ctx.query //page 和 limit 已经经过数据处理，均为 number 类型
    if (!keyword) {
        throw new HttpError(400, '提交的搜索内容为空！') //如果需要抛出异常请使用 HttpError 类
    }
    const result = await ajax('http://106.15.195.249:8011/search_new', {
        q: keyword,
        p: page,
    })
    ```

6.  返回数据格式化

    ```ts
    ctx.status = result.status
    if (ctx.status === 200) {
        const data: PansouResult = result.data //请在返回值中声明数据类型，方便处理数据
        //请一定要使用 RssChannel 构造函数
        const channel: RssChannel = new RssChannel({
            title: '网盘搜索',
            link: 'http://www.pansou.com/',
            description: '网盘搜索',
            webMaster: 'CaoMeiYouRen',
            item: data?.list?.data?.map(e => {//使用可选链将有效解决undefined问题
                let item = new RssItem({
                    title: e.title,
                    link: e.link,
                    description: e.des,
                    guid: e.link,
                })
                return item
            }).slice(0, limit),
            count: data?.list?.count,
        })
        ctx.body = channel
    } else {
        let message = IS_DEBUG ? result['stack'] : result['message']//建议进行异常处理，如果需要抛出异常请使用 HttpError 类
        ctx.body = { message }
    }
    ```

7.  挂载控制器到`pansou/index.ts`

    ```ts
    import Router = require('koa-router')
    import { index } from './controllers'
    const router = new Router()
    
    router.get('/', index)
    
    export default router
    ```

8.  挂载盘搜到 `routes/router.ts`

    ```ts
    import Router = require('koa-router')
    const router = new Router()
    
    import pansou from './pansou'
    router.use('/pansou', pansou.routes(), pansou.allowedMethods())
    
    export default router
    ```

9.  最终效果详见 `routes/pansou`

### 风格检查

```sh
npm run lint
```

本项目使用 eslint 来约束代码风格，请在完成代码的书写后执行风格检查。

### 编译

```sh
npm run build
```

本项目使用webpack来打包，只会生成一个可执行文件，即`dist\index.js`

因此对于部署而言十分方便。

::: warning 警告
方便部署是本项目的一个设计目标，若您添加的依赖导致无法顺利通过webpack打包编译，那么很遗憾这个PR将不会被接受。
:::

### 文档开发

```sh
npm run docs:dev
```

打开[http://localhost:4000/](http://localhost:4000/) 开始开发

修改文档后将同步更改。

::: tip 提示
vuepress 的热更新功能存在bug，有时会无法热更新。如果没有热更新可重新执行命令
:::

### 文档规范【待编写】

参考现有的文档编写即可

### 文档编译

```sh
npm run docs:build
```

实际上文档的编译是交给CI做的，你只需要检查下能否顺利通过编译即可

### 提交变更

本项目遵从严格的 git commit 约束，这将用于自动化生成日志，所以请勿直接提交 git commit。

本项目使用 cz-conventional-changelog 工具来生成 git commit，使用 husky 约束 git commit

```sh
npm run commit 
#请勿直接提交git commit
#若觉得修改太多也可分开提交。先 git add 一部分，执行 git cz 提交后再提交另外一部分
```

关于选项，参考 [semantic-release](https://github.com/semantic-release/semantic-release) 的文档

-   若为BUG修复，则选择 fix
-   若为新增功能，则选择 feat
-   若为移除某些功能，则选则 perf  或填写 BREAKING CHANGE
    -    perf 和其他破坏性更新，若不是为了修复BUG，原则上将拒绝该PR
    -   对于本项目而言，路由的破坏性更新并不算本项目的破坏性更新，因此即便出现了路由的破坏性更新，也按照`feat`提交

::: danger 警告
破坏性更新将由草梅友仁慎重审查后合并或拒绝
:::       

提交的描述可以使用中文或英文，只需要描述清楚改动即可