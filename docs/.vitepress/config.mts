import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "handism's tech blog",
  description: "handism's tech blog",

  vite: {
    ssr: {
      noExternal: ["vuetify"]
    }
  },

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
      { text: 'about', link: '/about' },
      { text: 'frontend', link: '/frontend' },
      { text: 'backend', link: '/backend' }
    ],

    sidebar: [
      {
        text: 'フロントエンド',
        items: [
          { text: 'Vue.jsのインストール', link: '/frontend/vue-js-introduction' },
          { text: 'VitePressのインストール', link: '/frontend/vitepress-introduction' },
          { text: 'Vuetifyでカスタマイズ', link: '/frontend/vitepress-vuetify-customize' },
          { text: 'ブログサービスの比較', link: '/frontend/blog-service-compare' }
        ]
      },
      {
        text: 'バックエンド',
        items: [
          { text: 'Spring BootでAPIサーバー', link: '/backend/spring-boot-api-server' }
        ]
      },
      {
        text: 'その他',
        items: [
          { text: 'Gitの使い方', link: '/tech/how-to-use-git' }
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
