# web_design_env_template
デザインカンプからWordpressテーマ化までの環境構築テンプレート

## インストール

```bash
npm install
```

## 開発手順

gulpの設定ファイルを雛形からコピーする。
```bash
cp gulp/config-example.js gulp/config.js
```

### 1. 静的サイトの制作
`./src`以下のファイルを監視して、`./static`以下に静的サイト用の成果物を出力。
```bash
npm run watch:static
```

#### 読み込むcss, jsファイルの指定

- `./src/ejs/part/__load_css.html.ejs`は`</head>`直前に読み込みたいcssファイルを指定
- `./src/ejs/part/__load_css.html.ejs`は`</body>`直前に読み込みたいjsファイルを指定


#### 画像やフォントの相対パスの指定

ejsやscssファイル中の画像やフォントなどのパスは`./src`以下の相対パスを指定する。
これは、IDEでのパスの補完を利用するためである。トランスパイル時にパスを自動で修正するので問題はない。

ただし、親ディレクトリの相対パスを指定するときは`../`から始める。
```html
<img src="../img/xxx.jpg">
```

```scss
body {
  background-image: url(../../img/bg.jpg);
}
```

#### ejsファイルの命名

ファイル名のプレフィックスによって、htmlやphpファイルとして出力されるか決まる。

| prefix | html | php |
|--------|------|-----|
| `_`で始まらない  | :o: | :o: |
| `_`が1つのみ    | :x: | :o: |
| `_`が2つ続く    | :x: | :x: |

#### 開発完了後の出力

開発完了後、`./static`以下に成果物を出力。
```bash
npm run build:static
```

### 2. 静的サイトのWordpressテーマ化

#### WPテーマとして認識させる
ejsファイルを元に`./src/php`以下にWPテーマ用phpファイルの雛形を出力する。(上書きはしない)
```bash
npm run php:init
```

初回、`./wp`にテーマ用のファイルを出力する。
```bash
npm run build:wp
```

ローカル環境のWordpressのthemeディレクトリにシンボリックリンクを貼る。
```bash
ln -s $(pwd)/wp <themeディレクトリ>/<開発テーマ名>
```

WPの管理画面で開発テーマを有効化する。

テーマが壊れて認識できない場合は、`./wp`直下の`style.css`と`index.php`が正しいか確認する。

#### 開発を始める

`./gulp/config.js`の`<ローカル環境のWPトップページURL>`を置き換える。
```js
module.exports = {
    browserSync: {
        wp: {
            proxy: '<ローカル環境のWPトップページURL>',
        }
    }
};
```

開発を開始するときに`./src`以下を監視する。
```bash
npm run watch:wp
```


開発完了後は`./wp`以下に成果物を出力。
```
npm run build:wp
```

