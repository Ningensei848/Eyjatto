export const pattern_comment = /^#+\s*@\S*/ // 先頭から，`#`が一つ以上あり，その次に空白が0箇所以上あり，その後に`@`が続くパターン
export const pattern_param = /^#+\s*@+param\s+/i // i オプションで大文字小文字問わず一致させる
export const pattern_endpoint = /^#+\s*@+endpoint\s+/i // i オプションで大文字小文字問わず一致させる
export const pattern_proxy = /^#+\s*@+proxy\s+/i // i オプションで大文字小文字問わず一致させる
export const pattern_title = /^#+\s*@+title\s+/i // i オプションで大文字小文字問わず一致させる
export const pattern_author = /^#+\s*@+author\s+/i // i オプションで大文字小文字問わず一致させる

// export const pattern_default_var = /^(\w+)\s*=\s*([[{]*[^\]}]+[\]}]*)\s+/
export const pattern_default_var = /^(\w+)\s*=\s*([[{]*[^\]}]*[\]}]*)\s+/
export const pattern_option_vars = /^#+\[(\w+)\]\s*=\s*([[{]*[^\]}]+[\]}]*)/
