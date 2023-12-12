---
title: Gitの使い方
description: Gitをうまく使いこなす方法
---

[[toc]]

## Gitについて

- Gitとは、ソースコードなどの分散型バージョン管理システムのこと
- サーバについてはGitHubやAWS CodeCommitなどのサービスがある
- クライアントについてはGitをインストールしてコンソールなどで操作したり、SourcetreeやVSCodeの拡張機能などのGUIで操作したりが可能

## Gitの基本操作

- GitHub上などでリポジトリを作成
- リポジトリをローカルにclone：`git clone [リポジトリURL]`
- ブランチ関連
    - ブランチ作成：`git branch [ブランチ名]`
    - ブランチ確認：`git branch`
    - ローカルブランチ削除：`git branch -d [branch]`
    - ブランチ切り替え：`git switch [ブランチ名]`
    - ブランチ同士をマージ：`git merge [ブランチ名] -m ‘コメント’`
    - ブランチ最新化
        - `git pull`
        - `git fetch`
    - Gitのログを確認：`git log —oneline`（抜けるには`q`）
- コミット関連
    - 設定していない場合は以下を設定
        - `git config --global user.name [ユーザー名]`
        - `git config --global user.email [メルアド]`
    - ステージエリアにファイル追加：`git add .`
    - ローカルリポジトリにコミット：`git commit -m “コメント”`
    - リモートリポジトリに反映：`git push origin [ブランチ名]`


## Commit時にUntracked files:が出た時

- `git clean -f`


## gitでファイルリネーム

- `git mv [旧ファイル名] [新ファイル名]`