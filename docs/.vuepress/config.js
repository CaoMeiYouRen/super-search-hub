const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai') //设置 +8:00 时区
module.exports = {
    port: 4000,
    base: '/',
    dest: 'public',
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/active-header-links',
        '@vuepress/nprogress',
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp, lang) => {
                    dayjs.locale(lang)
                    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        ]
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Super Search Hub',
            description: '超级聚合搜索：将任何能搜索的网页的搜索结果处理成一种统一的格式',
        },
    },
    themeConfig: {
        repo: 'CaoMeiYouRen/super-search-hub',
        editLinks: true,
        docsDir: 'docs',
        smoothScroll: true,
        locales: {
            '/': {
                lang: 'zh-CN',
                selectText: 'Languages',
                label: '简体中文',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: [
                    {
                        text: '指南',
                        link: '/',
                    },
                    {
                        text: '参与我们',
                        link: '/joinus/',
                    },
                    {
                        text: '部署',
                        link: '/install/',
                    },
                    {
                        text: '支持',
                        link: '/support/',
                    },
                    {
                        text: '更新日志',
                        link: '/changelog/',
                    },
                ],
                sidebar: {
                    '/joinus/': [
                        '',
                    ],
                    '/install/': [
                        '',
                    ],
                    '/support/': [
                        '',
                    ],
                    '/changelog/': [
                        '',
                    ],
                    '/': [
                        {
                            title: '指南',
                            collapsable: true,
                            children: [
                                '',
                            ],
                        },
                        {
                            title: '路由',
                            collapsable: false,
                            sidebarDepth: 1,
                            children: [
                                'api',
                            ],
                        },
                    ],
                },
            },
        },
    }
}