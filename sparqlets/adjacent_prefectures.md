---
id: adjacent_prefectures
title: どの都道府県に隣接しているかな？
author: tokummei
published: true
---

# どの都道府県に隣接しているかな？

都道府県名を入力すると，そこと県境を接する都道府県名のリストを得られます．

`http://ja.dbpedia.org/resource/` + `都道府県名` の URI においては，その都道府県の様々なプロパティを得ることが出来ます．

- [東京都](http://ja.dbpedia.org/resource/東京都)

そのプロパティのうち，「prop-ja:隣接都道府県」を探ることで，結果を返しているといえます．

この `prop-ja:` とは，`http://ja.dbpedia.org/property/` を表す `PREFIX` です．

つなげて復元すると，次のリンクが出来上がります:

- [`http://ja.dbpedia.org/property/隣接都道府県`](`http://ja.dbpedia.org/property/隣接都道府県`)

```sparql
PREFIX prop-ja: <http://ja.dbpedia.org/property/>
PREFIX resource-ja: <http://ja.dbpedia.org/resource/>
SELECT DISTINCT *
WHERE {
  resource-ja:{{of}} prop-ja:隣接都道府県 ?prefecture_name .
}
```

```json
{
  "endpoint": "http://ja.dbpedia.org/sparql",
  "form": [
    {
      "element": "autocomplete",
      "param": {
        "name": "of",
        "from": "list",
        "keywords": ["東京都", "埼玉県", "茨城県"]
      }
    }
  ]
}
```
