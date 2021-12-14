---
id: 'ndl_org_establish_year_and_history'
title: '"XX" を含む組織の創設年度と略歴'
author: '産総研 西村さん'
published: true
---

# "XX" を含む組織の創設年度および略歴

※[参照元リンク](https://wp.lodosaka.jp/tool/sparqlquery/#:~:text=%E3%80%8C%E5%AD%A6%E4%BC%9A%E3%80%8D%E3%82%92%E5%90%AB%E3%82%80,%E3%81%AA%E3%82%AF%E3%82%A8%E3%83%AA)

産総研 西村さん作

国立国会図書館典拠データ検索・提供サービスで利用可能なクエリ
[http://id.ndl.go.jp/auth/ndla/?query=](http://id.ndl.go.jp/auth/ndla/?query=)

- [Web NDL Authorities での例](https://id.ndl.go.jp/auth/ndla/?query=+select+distinct+*+where%7B%0D%0A++%3Fid+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2Fname%3E+%3Fname.%0D%0A++%3Fid+a+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2FOrganization%3E%3B%0D%0A++%3Chttp%3A%2F%2FRDVocab.info%2FElementsGr2%2FdateOfEstablishment%3E+%3Fdate%3B%0D%0A++%3Chttp%3A%2F%2FRDVocab.info%2FElementsGr2%2FcorporateHistory%3E+%3Fhistory.%0D%0A++filter+%28regex%28str%28%3Fname%29%2C+%22%E5%AD%A6%E4%BC%9A%22%29%29%0D%0A%7D%0D%0Aorder+by+%3Fdate&output=htmltab)

```sparql
select distinct * where{
  ?id <http://xmlns.com/foaf/0.1/name> ?name.
  ?id a <http://xmlns.com/foaf/0.1/Organization>;
  <http://RDVocab.info/ElementsGr2/dateOfEstablishment> ?date;
  <http://RDVocab.info/ElementsGr2/corporateHistory> ?history.
  filter (regex(str(?name), "{{xx}}"))
}
```

```json
{
  "endpoint": "http://id.ndl.go.jp/auth/ndla/",
  "form": [
    {
      "element": "auto",
      "param": {
        "name": "xx",
        "from": "list",
        "keywords": ["学会"]
      }
    }
  ]
}
```
