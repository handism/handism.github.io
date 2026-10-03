# handism — portfolio design studies

採用デザインは **B / The Edit**。明るい紙色、大きなタイポグラフィ、余白を活かしたAstro製ポートフォリオです。トップページには比較用バーを表示せず、右下にアニメーションの停止・再開ボタンだけを残しています。以前の3案も比較用に保存しています。

| URL | コンセプト |
| --- | --- |
| `/` | 採用版 B / The Edit |
| `/concepts/` | 保存した3案の比較ページ |
| `/lab/` | A / Midnight Lab：ダーク、ライム、動く軌道とカード型作品一覧 |
| `/editorial/` | B / The Edit：紙のような背景、大きなタイポグラフィ、交互の作品紹介 |
| `/gallery/` | C / Elsewhere：紫の光、動くポータル、大きな展示ビジュアル |

## 起動

Node.js 22.12以上の対応するLTS版を推奨。

```sh
npm ci
npm run dev -- --port 4321
```

http://localhost:4321/ を開きます。各デモ下部のバーから別案へ移動できます。

```sh
npm run check
npm run build
npm run preview -- --port 4322
```

`dist/` にGitHub Pagesで配信できる静的HTMLが生成されます。

## 公開

公開先: https://handism.github.io/

`.github/workflows/deploy.yml` が`main`へのpush時にNode.js 24で依存関係のインストール、型チェック、静的ビルドを実行し、成功した成果物をGitHub Pagesへデプロイします。GitHubのSettings → Pages → SourceはGitHub Actionsを選択します。Actions画面から手動での再デプロイもできます。

公開サイトでの動作確認:

```sh
PLAYWRIGHT_BASE_URL=https://handism.github.io npm run test:browser
```

## デモの内容

- 公開リポジトリ4件の紹介、カテゴリー絞り込み、詳細ダイアログ、GitHubへのリンク。
- 技術と使用プロジェクトを結びつけた紹介。習熟度や業務経験は推定していません。
- スクロール表示、CSSアニメーション、動きの一時停止、端末のモーション低減設定への対応。
- キーボードでの操作、Escapeでの詳細閉じ、開いたボタンへのフォーカス復帰。
- PCと狭い画面向けのレイアウト。

コンテンツは2026-10-03に確認した公開READMEをもとに、`src/data/projects.ts` に手動でまとめています。GitHubの自動同期や活動履歴の取得は未実装です。キャッチコピーと自己紹介は提案用の文案です。

作品ビジュアルはCSSで制作したコンセプトイラストで、実際のアプリのスクリーンショットではありません。画像生成・外部画像は使用していません。フォントはGoogle Fontsから読み込み、取得できない場合はシステムフォントにフォールバックします。

## 検証

```sh
npm run build
npm run test:browser
node scripts/capture.mjs
```

ブラウザテストはインストール済みGoogle Chromeを使用します。Playwrightが4322ポートに本番ビルドのプレビューを起動します。撮影スクリプトは4321ポートの開発サーバーを使い、`/tmp/handism-portfolio-previews/` にPC・スマホの画像を保存します。

自動テストは3案のフィルター・ダイアログ・キーボード・モーション設定・375px幅での横はみ出し・比較ページへの移動を確認します。実機スマートフォンやSafariの動作確認は含みません。

2026-10-03の検証結果：型チェックはエラー・警告とも0件、静的ビルドは5ページ生成（採用版と保存したデモ）、Chromeでの操作テストは7件成功。1440pxと375pxの画面を撮影して確認しています。

同日の`npm audit`ではAstroの開発依存`http-cache-semantics`についてGHSA-ch52-4w7c-c8xpが報告されています（依存元を含めhigh 2件）。このデモは静的配信のみで、同パッケージをブラウザ実行用JSに含めず、サーバー側キャッシュ機能も使用しません。自動修正が提示したAstro 2へのダウングレードは適用していません。デモから本番構成へ進める際に修正版を再確認してください。
