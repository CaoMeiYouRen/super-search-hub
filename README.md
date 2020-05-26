# super-search-hub 

设计目标：
将任何能搜索的网页的搜索结果处理成标准的RSS规范格式。
同时支持json和xml。
返回结果以json优先，xml通过转换产生

通用参数约定

-   text : string 查询内容
-   page : number 第几页结果
-   limit : number 条数限制
-   filter :string 过滤参数，将在返回结果的基础上进行过滤
-   nocache : boolean 是否禁用缓存，默认启用缓存
-   token : string 持有token可以不限制接口调用次数



接口返回格式约定
```json
{
    "statusCode": 404,//状态码
    "error": "Not Found",//状态码对应的text，仅>=400时存在
    "message": "Welcome to super-search-hub",//说明文本，成功或失败的说明
    "data": {}//返回的数据，对象或数组
}
```

​    "prebuild": "rimraf dist",



routes规范约定

-   文件夹以目标网站主域名命名，在不混淆的情况下不包含顶级域名。
-   如果需要取子域名则在主域名文件夹下再划分
    -   例如 www.baidu.com 命名为 baidu
    -   例如 tieba.baidu.com 在 baidu 文件夹下面，可命名为tieba
    -   若要区分 example.com 和 example.cn ，则需包含顶级域名
        -   但是先建的文件夹可以不包含顶级域名
-   文件夹下必须有 index.ts 
    -   index.ts 中只允许挂载路由，业务逻辑请在其他文件完成