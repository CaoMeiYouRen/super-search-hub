# 介绍

设计参考和灵感来源：[RSSHub](https://github.com/DIYgod/RSSHub)

设计目标：

-   将任何能搜索的网页的搜索结果处理成标准的RSS规范格式。
-   同时支持json和xml。
-   返回结果以json优先，xml通过转换产生
-   目标并不是支持RSS阅读器，而是将搜索结果转换为一种统一的格式，方便进行二次开发。仅参考RSS规范进行设计
-   项目的dist文件应当可以在node.js环境下直接运行，无需其他依赖【除redis缓存外】

开发这个项目的原因

-   对于杂七杂八的搜索结果感到厌烦，希望能整一个统一的格式
-   真实原因是对于”搜索机器人“这个项目感到无力，在不使用编程的情况下觉得太难处理了，为此模仿RssHub产生了这个项目



通用参数约定

-   keyword: string 查询内容。原则上必须有keyword
-   type: string [可选] 返回格式(json/xml)，默认为json
-   page: number [可选] 第几页结果，默认为1
-   limit: number  [可选] 条数限制，默认为10
-   filter:string  [可选] 过滤参数，将在返回结果的基础上进行过滤
-   sort: string  [可选]  排序方式
-   nocache: boolean [可选]  是否禁用缓存，默认启用缓存(false)
-   token: string  [可选] 持有token可以不限制接口调用次数



接口返回格式约定
```json
{
    "statusCode": 404,//状态码
    "error": "Not Found",//状态码对应的status text，仅>=400时存在
    "message": "Welcome to super-search-hub",//说明文本，成功或失败的说明
    "data": {}//返回的数据，数组或对象
}
```



routes规范约定

-   文件夹以目标网站主域名命名，在不混淆的情况下不包含顶级域名。
-   如果需要取子域名则在主域名文件夹下再划分
    -   例如 www.baidu.com 命名为 baidu
    -   例如 tieba.baidu.com 在 baidu 文件夹下面，可命名为tieba
    -   若要区分 example.com 和 example.cn ，则需包含顶级域名
        -   但是先建的文件夹可以不包含顶级域名
-   文件夹下必须有 index.ts 
    -   index.ts 中只允许挂载路由，业务逻辑请在其他文件完成
    -   路由一律采用默认导出的形式，即`export default router`
    -   路由名称同文件夹名称，若文件夹名称为` example`，则挂载路由为`router.use('/example', example.routes(), example.allowedMethods())`

文档约定【待补充】

