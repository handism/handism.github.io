import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "handism's tech blog",
  description: "handism's tech blog",

  // 新規追加
  ignoreDeadLinks: "localhostLinks",
  lang: "ja-JP",
  cleanUrls: true,
  srcDir: "./src",
  srcExclude: ["**/README.md", "**/TODO.md"],
  head: [["link", {rel: "icon", href: "/favicon.ico"}]],
  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: "/symbol-mark.webp",

    nav: [
      { text: 'Home', link: '/' },
      { text: 'about', link: '/about' },
      { text: 'frontend', link: '/frontend' },
      { text: 'sample', link: '/sample' }
    ],

    sidebar: [
      {
        text: '技術ブログ関連',
        items: [
          { text: 'Vue.jsのインストール', link: '/frontend/vue-js' },
          { text: 'ブログサービスの比較', link: '/frontend/blog-service-compare' }
        ]
      },
      {
        text: 'チートシート',
        items: [
          { text: 'Markdown Sample', link: '/sample/huga' },
          { text: 'Runtime API Examples', link: '/sample/api-examples' }
        ]
      }
    ],

    footer: {
      copyright: "©︎ 2023"
    },

    lastUpdated: {
      text: "最終更新日時",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium"
      }
    },

    search: {
      provider: "local"
    },

    docFooter: {
      prev: "前の記事",
      next: "次の記事"
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/handism' }
    ]
  }
})