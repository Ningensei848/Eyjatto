---
id: staring_and_directoring
title: '監督と出演を兼ねた人の作品一覧'
author: 'ningensei848'
published: true
---

# 監督と出演を兼ねた人の作品一覧

"オープンデータ時代の標準 Web API SPARQL" の記述をもとにクエリを作成した

```sparql
PREFIX dbpj: <http://ja.dbpedia.org/resource/>
PREFIX dbp-owl: <http://dbpedia.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT distinct ?film_name WHERE {
 ?film dbp-owl:director dbpj:{{name}};
 dbp-owl:starring dbpj:{{name}};
 rdfs:label ?film_name.
} LIMIT 100
```

```json
{
  "endpoint": "https://ja.dbpedia.org/sparql",
  "form": [
    {
      "element": "auto",
      "param": {
        "name": "name",
        "from": "list",
        "keywords": ["ビートたけし", "水谷豊", "大泉洋", "ディーン・フジオカ", "斎藤工", "竹中直人"]
      }
    }
  ]
}
```
