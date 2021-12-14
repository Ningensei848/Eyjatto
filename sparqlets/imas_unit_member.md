---
id: imas_unit_member
title: 【im@sparql】アイドルの参加ユニット
author: ばんじゅん 氏
published: false
---

# 【im@sparql】アイドルの参加ユニット

[橘ありす参加ユニット(属性つき・メンバー数順) by ばんじゅん 🍓 - ☆ ピコピコプラネット ☆ SPACE](https://space.pikopikopla.net/query/ec6e4801d9) を参考に，橘ありす以外のアイドルも検索できるようにしました !

[アイドルマスターシンデレラガールズ (あいどるますたーしんでれらがーるず)とは【ピクシブ百科事典】](https://dic.pixiv.net/a/アイドルマスターシンデレラガールズ#h2_2) のメンバー一覧を参考に検索してみてください

## 注意:

エンドポイント側のデータ登録状況によっては，メンバー名が正しくてもデータが表示されない場合があります

更新情報等については，[こちら](https://sparql.crssnky.xyz/) を参照してください

```sparql
PREFIX imas: <https://sparql.crssnky.xyz/imasrdf/URIs/imas-schema.ttl#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <http://schema.org/>

SELECT (?ユニット名 AS ?name) (GROUP_CONCAT(?ユニットメンバー名; SEPARATOR = ",") AS ?memberNames_concat) (GROUP_CONCAT(?ユニットメンバー属性; SEPARATOR = ",") AS ?types_concat)
WHERE {
  ?アイドル名 a imas:Idol;
    rdfs:label "{{name}}";
    schema:memberOf ?参加ユニット.
  ?参加ユニット a imas:Unit;
    schema:name ?ユニット名;
    schema:member ?ユニットメンバー.
  ?ユニットメンバー a imas:Idol;
    rdfs:label ?ユニットメンバー名;
    imas:Type ?ユニットメンバー属性 .
}
GROUP BY ?ユニット名
```

```json
{
  "endpoint": "https://sparql.crssnky.xyz/spql/imas/query",
  "form": [
    {
      "element": "auto",
      "param": {
        "name": "name",
        "from": "list",
        "keywords": [
          "橘ありす",
          "安部菜々",
          "五十嵐響子",
          "一ノ瀬志希",
          "緒方智絵里",
          "乙倉悠貴",
          "輿水幸子",
          "小早川紗枝",
          "小日向美穂",
          "佐久間まゆ",
          "櫻井桃華",
          "島村卯月",
          "白菊ほたる",
          "関裕美",
          "中野有香",
          "早坂美玲",
          "双葉杏",
          "前川みく",
          "三村かな子",
          "宮本フレデリカ",
          "アナスタシア",
          "荒木比奈",
          "神谷奈緒",
          "川島瑞樹",
          "神崎蘭子",
          "鷺沢文香",
          "塩見周子",
          "渋谷凛",
          "白坂小梅",
          "高垣楓",
          "高橋礼子",
          "多田李衣菜",
          "新田美波",
          "二宮飛鳥",
          "速水奏",
          "藤原肇",
          "北条加蓮",
          "松永涼",
          "三船美優",
          "森久保乃々",
          "相葉夕美",
          "赤城みりあ",
          "市原仁奈",
          "大槻唯",
          "片桐早苗",
          "佐藤心",
          "城ヶ崎美嘉",
          "城ヶ崎莉嘉",
          "高森藍子",
          "十時愛梨",
          "日野茜",
          "姫川友紀",
          "星輝子",
          "堀裕子",
          "本田未央",
          "村上巴",
          "諸星きらり",
          "依田芳乃"
        ]
      }
    }
  ]
}
```
