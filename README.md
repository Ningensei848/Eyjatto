# SPARQList Next

SPARQList x Next.js x MUI DataGrid

Repository server for working SPARQL snippets

See on [Vercel](https://sparqlist-next.vercel.app) or [GitHub Pages](https://ningensei848.github.io/SPARQListNext)

## Features

- No Relational Database; load static files (Markdown)
- No own server required
  - You can also deploy to [vercel](https://vercel.app) or [GitHub Pages](https://pages.github.com) without any complicated configuration
- No [SSR](https://nextjs.org/docs/basic-features/pages#server-side-rendering), but [SG](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)
- No subcontractor / outsourcing
  - Form(s) is generated via `Eyjatto`.
  - All you have to do is to write form configurations according to the specification.

## Description

Goal: [SPARQList](https://github.com/dbcls/sparqlist) Altanative + Opendata Analysis Platform

<!-- **_DEMO:_**
![Demo](https://image-url.gif) -->

## forerunners

- [SPARQList](https://github.com/dbcls/sparqlist)
- [space-pikopikoplanet](https://github.com/foooomio/space-pikopikoplanet)
- [YASGUI: Yet Another Sparql GUI](https://github.com/TriplyDB/Yasgui)

## Requirement

- node.js: `>=14`

## Installation

```shell
$ git clone https://github.com/Ningensei848/SPARQListNext
$ cd SPARQListNext && yarn install
$ yarn dev
```

<!-- ## Deploy

### for Vercel
### for GitHub Pages -->

## TODO:

- [ ] `ProxyURL` をいちいち外に出なくても良いようにする(http なしで実行できるようにする)
- [x] ~~redux toolkit の採用~~
- [x] ~~全体のリファクタリング~~
- 要件の見直し
  - [ ] embed.js としての切り出し，クエリ実行中のインジケータ表示，RDB を採用する場合の接続方法
- [ ] 裏側のクエリを見られる＆直接変更もできるように
- [ ] SPARQLet の自体の検索（フリーワード及びタグ等）
- [ ] sparqlet の fork
- [ ] form config generator & validator
- [x] ~~form config の仕様拡張~~
- [ ] SPARQLet コードブロックの記法を改正
- [ ] datagrid 制限の回避
- [ ] `const` を一箇所にまとめる
- [ ] MDX build の速度改善

## Author

[![Twitter is what's happening in the world and what people are talking about right now.](https://img.shields.io/badge/@Ningensei848-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Ningensei848)

[![](https://img.shields.io/badge/k.kubokawa@klis.tsukuba.ac.jp-%23757575.svg?&style=for-the-badge&logo=gmail&logoColor=EA4335)](mailto:k.kubokawa@klis.tsukuba.ac.jp)

## License

_This software is released under the [MIT License](https://github.com/Ningensei848/SPARQListNext/blob/main/LICENSE)._
