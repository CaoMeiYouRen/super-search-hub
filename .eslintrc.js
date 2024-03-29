const __ERROR__ = process.env.NODE_ENV === 'production' ? 2 : 0
const __WARN__ = process.env.NODE_ENV === 'production' ? 1 : 0
module.exports = {
    root: true,
    globals: {
    },
    env: {
        es6: true,
        commonjs: true,
        node: true,
        mocha: true,
    },
    extends: [
        'cmyr'
    ],
    plugins: [
    ],
    parserOptions: {
        ecmaVersion: new Date().getFullYear() - 1,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
    parser: '@typescript-eslint/parser',
    rules: {
        'no-console': 0, // 禁止console
        'eol-last': [__WARN__, 'never'], // 禁止文件末尾存在空行
        'no-empty': 0
    },
}
