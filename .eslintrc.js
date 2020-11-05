const IS_PROD = process.env.NODE_ENV === 'production' ? 2 : 0
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
        'comma-dangle': [IS_PROD, 'never'], // 要求或禁止使用拖尾逗号
    },
}
