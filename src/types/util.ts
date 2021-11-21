/*
 ** TypeScriptで排他的なプロパティを定義する | miyauci.me
 ** cf. https://miyauchi.dev/ja/posts/exclusive-property/#フラット構造の排他型の定義
 */
export type Exclusive<T extends Record<PropertyKey, unknown>, U extends Record<PropertyKey, unknown>> =
    | (T & { [k in Exclude<keyof U, keyof T>]?: never })
    | (U & { [k in Exclude<keyof T, keyof U>]?: never })
