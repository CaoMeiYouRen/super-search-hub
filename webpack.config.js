const path = require('path')
module.exports = {
    mode: 'production',
    entry: {
        build: path.join(__dirname, './src/bin/www.ts')
    },
    target: 'node',
    output: {
        library: {
            root: 'SuperSearchHub',
            amd: 'super-search-hub',
            commonjs: 'super-search-hub'
        },
        libraryTarget: 'umd',
        path: path.join(__dirname, './dist'),
        filename: 'index.js'
    },
    externals: [],
    node: {
        // do not polyfill Buffer
        Buffer: false,
        stream: false,
        process: false,
        path: false,
        fs: false,
        util: false,
        http: false,
        https: false,
        tty: false,
        zlib: false,
        events: false,
        os: false,
        __filename: false,
        __dirname: false,
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',//配置加载typescript
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        //路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        //路径别名自动解析确定的扩展
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
}