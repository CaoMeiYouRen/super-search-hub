/**
 * 这个文件必须在所有测试文件之前导入
 * 用于注册路径别名
 */
import moduleAlias from 'module-alias'
import path from 'path'
moduleAlias.addAlias('@', path.join(__dirname, '../src'))
// 设置缓存类型为内存。使用redis会导致服务器无法结束
process.env.CACHE_TYPE = 'memory'