import { AtMark } from "@/types/common"
import { extractDataProps } from "@/types/editor"
import { pattern_comment, pattern_default_var, pattern_option_vars, pattern_param } from "@/util/pattern"
import { isAtMark, isExtractedAtMark, isFormOptionName } from "@/util/validation"

// TODO: @param 以外の`MetaData` 群に対しても同様の処理ができるようにする
//       default_value はendpoint, author, title, proxy となるようにする
export const extractData = (props: extractDataProps): AtMark | null => {
  const { at, line, parent_id, pattern } = props
  if (!isAtMark(at)) {
    return null
  }
  // e.g. defaultVariable=hogehoge #[option_name]=foobar  // 単純にsplitできない，key名が不定→片側から地道に処理
  const result_default = pattern_default_var.exec(line.replace(pattern, "") + " ") // 末尾に空白文字をつける（エラー回避？）

  if (!result_default) {
    // defaultVariableが存在しない場合，処理を終了
    return null
  } else {
    // defaultVariableが存在する場合，optionの有無で処理が分岐
    const result_option = pattern_option_vars.exec(result_default.input.replace(pattern_default_var, "").trim())

    if (!result_option) {
      // optionがない場合
      return {
        at: at,
        var_name: result_default[1],
        var_elem: result_default[2],
        parent_id: parent_id
      }
    } else {
      // optionがある場合
      const opt_name = result_option[1]
      if (isFormOptionName(opt_name)) {
        return {
          at: at,
          var_name: result_default[1],
          var_elem: result_default[2],
          opt_name: opt_name,
          opt_elem: result_option[2],
          parent_id: parent_id
        }
      } else {
        return null
      }
    }
  }
}

export const extractAtMarks = (parent_id: string | number, value: string): Array<AtMark> => {
  const commentsWithAtmark = value
    .split("\n")
    .map((line) => {
      const stripLine = line.trim()
      return pattern_comment.exec(stripLine) ? stripLine : ""
      // return stripLine.match(pattern_comment) ? stripLine : ""
    })
    .filter(Boolean)
    .map((stripLine) => {
      // ここで `# @param hoge=qwerty` が適切に処理できていない
      const res = extractData({ at: "param", line: stripLine, parent_id: parent_id, pattern: pattern_param })
      return res ? res : stripLine // chain させるために，もとの文字列を返す
    })
  // TODO: ほかのatmark に対しても通じる関数を書く
  // .map((elem) => extractMetadata(elem, 'endpoint', pattern_endpoint, parent_id)) // atEndpoints
  // .map((elem) => extractMetadata(elem, 'proxy', pattern_proxy, parent_id)) // atProxies
  // .map((elem) => extractMetadata(elem, 'title', pattern_title, parent_id)) // atTitles
  // .map((elem) => extractMetadata(elem, 'author', pattern_author, parent_id)) //atAuthors)

  const atmarks: Array<AtMark> = []
  // なぜか Array.fliter() は使えない（型ガードがよくわからない）
  for (const atmark of commentsWithAtmark) {
    if (isExtractedAtMark(atmark)) {
      atmarks.push(atmark)
    }
  }

  return atmarks
}
