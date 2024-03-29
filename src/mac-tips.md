---
title: Macのセットアップ時の設定メモ
date: 2024-01-10
tags: [Mac]
image: falling-apples.webp
---

## Macお気に入り設定

- マウス
  - 軌跡の速さ：最速にする
  - ナチュラルなスクロール：ON
  - 副ボタンのクリック：右側をクリック
  - ページ間をスワイプ：1本指で左右にスクロール
- トラックパッド
  - 軌跡の早さ：最速にする
  - タップでクリック：ONに
  - ナチュラルなスクロール：ON
    - こうすることで、Winと方向が一致する
- キーボード
  - Caps LockキーでABC入力モードと切り替える：ON
  - ライブ変換：ON
  - Windows風のキー操作：ON
  - F1、F2などのキーを標準のファンクションキーとして使用：ON
  - 地球儀キーを押して：絵文字と記号を表示
  - キーボードナビゲーション：ON
- ドック
  - ドックを自動的に非表示にする：ON
  - アプリの提案と最近使用したアプリをDockに表示：OFF
  - ドックの不要なアイコンを削除する
- メニューバー
  - メニューバーのアイコン表示非表示を調整する
  - メニューバーを自動的に非表示にする：ON
- Finder
  - パスバー、タブバー、ステータスバーを表示
  - サイドバーにホームディレクトリ表示
  - 拡張子表示
  - 隠しファイル表示
    - 表示：`defaults write com.apple.finder AppleShowAllFiles true killall Finder`
    - 非表示：`defaults write com.apple.finder AppleShowAllFiles false killall Finder`
- ショートカットアプリを有効活用
  - 作業環境一発構築系
- コマンドのエイリアスを作成
- 仮想デスクトップを有効活用
- ウィジェットを有効活用
- ホットコーナー：設定しない
- ファイアウォールをONにする
- デスクトップのバックグラウンドを変更：ブラック
- FileVaultディスク暗号化
  - FileVaultディスク暗号化を有効にする：ON
  - iCloudアカウントによるディスクのロック解除を許可：ON
- Safariの設定
  - お気に入りバーの表示
  - ホームページをGoogleにした
  - 新規ウィンドウ、新規タブをホームページにした
  - 機能拡張
    - Google Analytics Opt-out Browser Add-on
    - Adblockの導入
    - AdGuardの導入（結局↑と同時にONしてみたらいい感じになった）
- アプリケーションのインストール
  - Notion
  - Journey
  - Chrome
  - Adobe CC系
  - Scroll Reverser
  - Spectacle
    - `opt + command + 矢印`：ウインドウ整列
    - `opt + command + f`：ウインドウ最大化
    - `control + opt + command + 矢印`：ウインドウのモニタ移動


## MacのTips

- フォルダ内の大量の画像をプレビューしていきたい
  - ダブルクリックで起動のプレビューアプリだと不向き
  - ファイルにカーソル合わせてスペースキーでクイックプレビューができ、そのままFinder上でカーソルを移動できるから便利
- 「〜」が入力できないので「ユーザ辞書」機能で「から」で「〜」を登録
- DVDの吸い出し
  - 外付けディスクドライブにDVDを入れる
  - 「ディスクユーティリティ」を起動する
  - 左側からDVDを選択してツールバーの「新規イメージ」＞XXXからイメージ作成
  - .dmgファイルが出来上がるので、ダブルクリックでマウント
  - マウントした状態で、Spotlight検索から「DVDプレイヤー.app」を起動すればディスクなしで動画が視聴可能
- ChromeからSafariへのブックマークコピー
  - Safariを立ち上げ、ファイル＞読み込む＞Google Chrome
    - ブックマークと履歴とパスワードもコピーできる
- windowsからの乗り換え時の公式からのノウハウ
  - https://support.apple.com/ja-jp/HT204216
- 「きょう」で変換すると今日の日付が出て日記とか会議録に便利
- シェルスクリプトを作成
  - http://hseisyu.blogspot.jp/2010/10/linux-mac-finder.html
  - ↑を参考に。
  - 最後に自動でターミナルを終了させたい場合は`killall Terminal`
- 仮想デスクトップを活用する


## よく使うショートカット

- カナABC変換：`CapsLockキー`
- アプリ切り替え：`Command + Tab`
- ウィンドウ（タブ）を閉じる：`Command + W`
- アプリ終了：`Command + Q`
- ファイル名変更：ファイルを選択してから`return`
- ファイルのプレビュー：ファイルを選択してから`スペースバー`
- 画面キャプチャ：`Command + Shift + 3（全画面）、4（範囲）、5（選択）`
    - ウインドウ単位での撮影は`Command + Shift + 4 + Space`から、ウインドウをクリック。
    - 保存先はデスクトップ
- Spotlight検索（ファイル検索）：`Command + スペースバー`
- タスクマネージャみたいなもの（強制終了）：`Command + Option + esc`
- ウィンドウ切り替え：`command + TAB`　または　`３本指スワイプ`
- ウィンドウ全画面化：`command + control + f`
- safariタブ切り替え：`control + Tab` または `command + shift + 矢印`
- 戻る：`command + 矢印`　または　`２本指横スワイプ`
- アプリのフルスクリーンモード切り替え：`地球儀キー ＋ F`
- ファイル削除：`Command + Delete`
- デスクトップを表示：`地球儀キー ＋ H`
- 隠しファイルの表示非表示切り替え：`Command + Shift`
- 切り取り：貼り付けるときに`Command + Option + V`
- リンゴマークを出す：`Option + Shift + K`
- 変換
    - `F6`：ひらがな
    - `F7`：カタカナ
    - `F8`：半角カタカナ
    - `F9`：全角英字
    - `F10`：英字
- トラックパッド
    - `2本指ですべらせる`：スクロール
    - `3本指ですべらせる`：スワイプ
    - `2本指でひねる`：回転
    - 設定のトラックパッドから確認可能