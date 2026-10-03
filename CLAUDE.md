# CLAUDE.md

handism の Astro 製ポートフォリオ（https://handism.github.io/）。外向けの説明は README.md、開発上の約束事はこのファイルにまとめる。

## ページ構成

- `/`：採用版（B / The Edit）。`src/pages/index.astro` で `getTheme('editorial')` を選択。比較用バーは出さず、右下のモーション停止ボタンだけ置く
- `/lab/`・`/editorial/`・`/gallery/`：保存した3案（`src/pages/[theme].astro`）。ページ下部のバーで別案・比較ページへ移動できる
- `/concepts/`：3案の比較ページ
- canonical と OGP（`public/og.png`）を全ページに設定。トップ以外は `noindex`

## コードの配置

- `src/data/projects.ts`：作品情報、作品数、カテゴリー一覧
- `src/data/themes.ts`：テーマ情報、イラストの種類、テーマ別の見出し・文言
- `src/data/expertise.ts`：About欄の技術と対応するプロジェクト
- `src/data/art.ts`：コンセプトイラストの種類（`Art.astro` の `type` の型）
- `src/data/links.ts`：GitHubのURL
- `src/utils/format.ts`：ビルド時表示と絞り込みスクリプトで共有する件数表示
- `src/components/ProjectCard.astro` / `ProjectDialog.astro`：作品一覧と詳細
- `src/components/MotionToggle.astro`：トップ・各案・比較ページ共通の停止ボタン
- `src/styles/global.css`：CSSの読み込み口。共通 → イラスト → テーマ → 操作部品 → 比較ページ → アニメーション → レスポンシブ の順序を維持する
  - テーマ・比較ページ固有のメディアクエリは各テーマのCSSに置く
  - モーション低減の指定は `animations.css`、共通のレスポンシブ指定は `responsive.css`

## コンテンツの方針

- 作品情報は公開リポジトリのREADMEをもとに `src/data/projects.ts` で手動管理（GitHubの自動同期・活動履歴の取得は未実装）。最終確認は 2026-10-03
- 詳細ダイアログのリンク：Sauna Simulator・Sauna Itta は公開デモ、Memo Explorer は VSIX v1.1.0 の直接ダウンロード、Mini Brain は公開リリースがないため GitHub リンクのみ
- 技術紹介で習熟度や業務経験は推定しない
- キャッチコピーと自己紹介は提案用の文案
- 作品ビジュアルはCSSのコンセプトイラスト。画像生成・外部画像は使わない
- フォントは `src/layouts/Base.astro` の `<link>` で Google Fonts から読み込み、失敗時はシステムフォントにフォールバック

## 開発コマンド

```sh
npm ci
npm run dev -- --port 4321
npm run check
npm run build
npm run preview -- --port 4322
npm run format          # 対象: src, tests, scripts, 設定ファイル
npm run format:check
```

## テスト・検証

- `npm run test:browser`：Playwright が 4322 ポートで本番ビルドのプレビューを起動してテストする。ローカルではインストール済み Google Chrome、CI（`CI` 環境変数あり）では同梱 Chromium を使う
- 公開サイトに対して実行：`PLAYWRIGHT_BASE_URL=https://handism.github.io npm run test:browser`
- テスト範囲：3案のフィルター・ダイアログ・キーボード・モーション設定・375px幅での横はみ出し・比較ページへの移動、比較ページのアニメーション停止/再開とモーション低減設定への追従。実機スマートフォンや Safari は対象外
- `npm run capture`：4321 ポートの dev/preview サーバー（`BASE_URL` で変更可）からPC・スマホの画像を撮影し、OSの一時ディレクトリの `handism-portfolio-previews/` に保存（`CAPTURE_DIR` で変更可）
- `npm run og-image`：トップページを 1200×630 で撮影して `public/og.png` を更新

## デプロイ

`.github/workflows/deploy.yml`：`main` への push で Node.js 24 を使い、依存インストール → 整形チェック → 型チェック → ビルド → Playwright テストを実行し、成功した成果物を GitHub Pages へデプロイ。PRでは検証のみ。Actions画面から手動再デプロイ可。Settings → Pages → Source は GitHub Actions。

## 既知の課題

- `npm audit`（2026-10-03）で Astro の開発依存 `http-cache-semantics` に GHSA-ch52-4w7c-c8xp（依存元を含め high 2件）。静的配信のみでブラウザ用JSに含まれず、サーバー側キャッシュ機能も使わないため実害なし。自動修正が提案する Astro 2 へのダウングレードは適用しない。Astro 更新時に修正版を再確認する
