---
id: population_by_area
title: 〇〇区の日本人の人口
author: e-stat
published: true
---

# XX 区の日本人の人口を求める

新宿区の日本人の人口を求めるクエリーです

出典: SPARQL Query のサンプル | 統計 LOD
cf. [http://data.e-stat.go.jp/lodw/sparqlendpoint/querysample](http://data.e-stat.go.jp/lodw/sparqlendpoint/querysample)

## 対象区域のリスト

足立区, 墨田区, 荒川区, 世田谷区, 板橋区, 台東区, 江戸川区, 千代田区, 大田区, 中央区, 葛飾区, 豊島区, 北区, 中野区, 江東区, 練馬区, 品川区, 文京区, 渋谷区, 港区, 新宿区, 目黒区, 杉並区

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>
PREFIX estat-measure: <http://data.e-stat.go.jp/lod/ontology/measure/>
PREFIX cd-dimension: <http://data.e-stat.go.jp/lod/ontology/crossDomain/dimension/>
PREFIX cd-code: <http://data.e-stat.go.jp/lod/ontology/crossDomain/code/>
PREFIX g00200521-dimension-2010:<http://data.e-stat.go.jp/lod/ontology/g00200521/dimension/2010/>
PREFIX g00200521-code-2010:<http://data.e-stat.go.jp/lod/ontology/g00200521/code/2010/>
select  ?year ?population
where {
      ?s estat-measure:population ?population ;
         sdmx-dimension:refArea / rdfs:label "{{area}}区"@ja ;
         cd-dimension:timePeriod ?year ;
         cd-dimension:sex cd-code:sex-all ;
         cd-dimension:nationality cd-code:nationality-japan ;
         g00200521-dimension-2010:area g00200521-code-2010:area-all ;
         cd-dimension:age cd-code:age-all .
}
```

```json
{
  "endpoint": "http://data.e-stat.go.jp/lod/sparql/alldata/query",
  "form": [
    {
      "element": "select",
      "param": {
        "name": "area",
        "from": "list",
        "keywords": [
          "足立",
          "墨田",
          "荒川",
          "世田谷",
          "板橋",
          "台東",
          "江戸川",
          "千代田",
          "大田",
          "中央",
          "葛飾",
          "豊島",
          "北",
          "中野",
          "江東",
          "練馬",
          "品川",
          "文京",
          "渋谷",
          "港",
          "新宿",
          "目黒",
          "杉並"
        ]
      }
    }
  ]
}
```
