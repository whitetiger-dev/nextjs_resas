# Resas Webアプリ Next.js(Typescript) デモ

- フロントエンド: Nextjs 14.1.0（Highcharts / Redux-toolkit /Resas API）
- 環境: Node.js 20.11.0
- テスト: ユニットテスト (Jest)
- リント: PrettierとEslintを利用
- デプロイ: AWS Amplify

## ライブデモ

https://master.djhggwcd9oi6z.amplifyapp.com

## ❯ はじめに

### ステップ1: Resas APIキーの取得

次のURLからResas APIキーを取得してください。
[Resas](https://opendata.resas-portal.go.jp/)にアクセスし、アカウントを登録してAPIキーを取得します。
環境変数は次のように設定します：

```bash
.env
REACT_APP_API_KEY=YOUR_API_KEY_HERE
```

### ステップ2: 開発環境のセットアップ

何かを行う前に開発環境をセットアップする必要があります。

[Node.jsとNPM](https://nodejs.org/ja/download/)をインストールします。

それから、あなたのアプリケーション環境を設定します。

```bash
npm install
```

```bash
npm start
```

> これにより、すべての依存関係がNPMでインストールされます。そのため、これにより開発環境は使用準備が整います。

### ステップ3: ユニットテスト

- `npm run test` を実行してユニットテストを行います。

### ステップ4: ビルド

- `npm run build` を実行してプロジェクトをビルドします。

## 主要な機能

- SCSSと用いたレスポンシブデザインの実装
- Reactの標準的なアーキテクチャの実装
- データキャッシュやデータ取得時のローディングバーの追加にreduxを使用
- 都道府県のチェックボックスのダブルクリックエラーの防止
- mockstoreとJestを用いた各コンポーネントのユニットテストの実装
- スマートなコードスタイルのためのEslintとPrettierの統合
