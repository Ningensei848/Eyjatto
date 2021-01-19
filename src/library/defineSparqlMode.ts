// Writing CodeMirror Modes | CodeMirror Documents cf. https://codemirror.net/doc/manual.html#modeapi
import CodeMirror from "codemirror"

type column = number
type indentation = number
type types = string

interface Context {
  prev: Context
  col: column
  indent: indentation
  type: types
  align?: boolean | null
}
interface State {
  tokenize: (stream: CodeMirror.StringStream, state: State) => string
  col: column
  indent: indentation
  context: Context
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defineSparqlMode = (config: CodeMirror.EditorConfiguration): CodeMirror.Mode<any> => {
  const indentUnit = typeof config.indentUnit === "number" ? config.indentUnit : 0
  const operatorChars = /[*+\-<>&|^/!?]/
  let curPunc: string | null
  let sparql_doc = 0
  let sparql_doc_param: string | boolean = false
  let string_end = /[^']*'/

  function wordRegexp(words: Array<string>): RegExp {
    return new RegExp("^(?:" + words.join("|") + ")$", "i")
  }

  function nonSpecificCharactersProcess(stream: CodeMirror.StringStream): string {
    stream.eatWhile(/[_\w\d]/)
    if (stream.eat(":")) {
      stream.eatWhile(/[\w\d._-]/)
      return "string-2"
    }
    const word = stream.current()
    if (ops.test(word)) return "builtin"
    else if (keywords.test(word)) return "keyword"
    else {
      if (sparql_doc == 1) {
        sparql_doc = 2
        return "meta"
      } else {
        return "variable"
      }
    }
  }

  const ops = wordRegexp([
    "str",
    "lang",
    "langmatches",
    "datatype",
    "bound",
    "sameterm",
    "isiri",
    "isuri",
    "iri",
    "uri",
    "bnode",
    "count",
    "sum",
    "min",
    "max",
    "avg",
    "sample",
    "group_concat",
    "rand",
    "abs",
    "ceil",
    "floor",
    "round",
    "concat",
    "substr",
    "strlen",
    "replace",
    "ucase",
    "lcase",
    "encode_for_uri",
    "contains",
    "strstarts",
    "strends",
    "strbefore",
    "strafter",
    "year",
    "month",
    "day",
    "hours",
    "minutes",
    "seconds",
    "timezone",
    "tz",
    "now",
    "uuid",
    "struuid",
    "md5",
    "sha1",
    "sha256",
    "sha384",
    "sha512",
    "coalesce",
    "if",
    "strlang",
    "strdt",
    "isnumeric",
    "regex",
    "exists",
    "isblank",
    "isliteral",
    "a"
  ])
  const keywords = wordRegexp([
    "base",
    "prefix",
    "select",
    "distinct",
    "reduced",
    "construct",
    "describe",
    "ask",
    "from",
    "named",
    "where",
    "order",
    "limit",
    "offset",
    "filter",
    "optional",
    "graph",
    "by",
    "asc",
    "desc",
    "as",
    "having",
    "undef",
    "values",
    "group",
    "minus",
    "in",
    "not",
    "service",
    "silent",
    "using",
    "insert",
    "delete",
    "union",
    "true",
    "false",
    "with",
    "data",
    "copy",
    "to",
    "move",
    "add",
    "create",
    "drop",
    "clear",
    "load"
  ])

  const tokenBase = (stream: CodeMirror.StringStream, state: State): string => {
    const ch = stream.next()
    curPunc = null
    if (sparql_doc == 2) {
      sparql_doc = 0
      stream.skipToEnd()
      return "comment"
    } else if (ch == null) {
      return nonSpecificCharactersProcess(stream) // return string
    } else if (ch == "{" && /^\{\{[\w.]+\}\}/.exec(stream.string.substring(stream.start))) {
      stream.match(/\{[\w.]+\}\}/)
      return "ss_sparql-doc_param"
    } else if (ch == "$" || ch == "?") {
      if (ch == "?" && stream.match(/\s/, false)) {
        return "operator"
      }
      stream.match(/^[\w\d-]*/)
      return "variable-2"
    } else if ((ch == "<" && !stream.match(/^[\s\u00a0=]/, false)) || sparql_doc_param == "tag") {
      if (/\{\{[\w.]+\}\}/.exec(stream.string.substring(stream.start))) {
        stream.match(/[^{]+/)
        sparql_doc_param = "tag"
        return "tag"
      }
      sparql_doc_param = false
      stream.match(/^[^\s\u00a0>]*>?/)
      return "tag"
    } else if (ch == '"' || ch == "'" || sparql_doc_param == "string") {
      if (/[^']*'/.exec(stream.string) || /[^"]*"/.exec(stream.string.substring(stream.start))) {
        if (ch == '"') {
          string_end = /[^"]*"/
        }
        if (ch == "'") {
          string_end = /[^']*'/
        }

        if (/\{\{[\w.]+\}\}/.exec(stream.string.substring(stream.start))) {
          stream.match(/[^{]+/)
          sparql_doc_param = "string"
        } else {
          stream.match(string_end)
          sparql_doc_param = false
        }
        return "string"
      }
      state.tokenize = tokenLiteral(ch)
      return state.tokenize(stream, state) // return string
    } else if (/[{}(),.;[\]]/.test(ch)) {
      curPunc = ch
      return "bracket"
    } else if (ch == "#") {
      if (/^# +@\w/.exec(stream.string)) {
        stream.eatWhile(/[#\s+]/)
        sparql_doc = 1
      } else if (/^##+ *endpoint/.exec(stream.string.toLowerCase())) {
        stream.eatWhile(/[#\s+]/)
        sparql_doc = 1
      } else {
        stream.skipToEnd()
      }
      return "comment"
    } else if (operatorChars.test(ch)) {
      stream.eatWhile(operatorChars)
      return "operator"
    } else if (ch == ":") {
      stream.eatWhile(/[\w\d._-]/)
      return "string-2"
    } else if (ch == "@") {
      if (sparql_doc == 1) {
        if (/ [^\s]/.exec(stream.string.substr(stream.start))) {
          sparql_doc = 2
        } else {
          sparql_doc = 0
        }
      }
      stream.eatWhile(/[a-z\d-]/i)
      return "meta"
    } else if (ch == "=") {
      const string_tmp = " " + stream.string + " "
      if (stream.eat("b") && (/[\s.;]=b\s/.exec(string_tmp) || /[\s.;]=begin\s/.exec(string_tmp))) {
        state.tokenize = tokenComment
        return tokenComment(stream, state) // return string
      }
      // TODO: here is non-return
    }
    return nonSpecificCharactersProcess(stream) // return string
  }

  function tokenLiteral(quote: string) {
    return function (stream: CodeMirror.StringStream, state: State): string {
      let escaped = false,
        ch
      while ((ch = stream.next()) != null) {
        if (ch == quote && !escaped) {
          state.tokenize = tokenBase
          break
        }
        escaped = !escaped && ch == "\\"
      }
      return "string"
    }
  }

  function tokenComment(stream: CodeMirror.StringStream, state: State): string {
    let ch
    while ((ch = stream.next())) {
      if (ch == "=") {
        const string_tmp = " " + stream.string + " "
        if (stream.eat("e") && (/[\s.;]=e\s/.exec(string_tmp) || /[\s.;]=end\s/.exec(string_tmp))) {
          stream.match("nd")
          if (stream.eatSpace() || stream.eol()) {
            state.tokenize = tokenBase
            break
          }
        }
      }
    }
    return "ss_debug_comment"
  }

  function pushContext(state: State, type: string, col: number): void {
    state.context = {
      prev: state.context,
      indent: state.indent,
      col: col,
      type: type
    }
  }

  function popContext(state: State): void {
    state.indent = state.context.indent
    state.context = state.context.prev
  }

  return {
    startState: function () {
      return {
        tokenize: tokenBase,
        context: null,
        indent: 0,
        col: 0
      }
    },

    token: function (stream: CodeMirror.StringStream, state: State) {
      if (stream.sol()) {
        if (state.context && state.context.align == null) state.context.align = false
        state.indent = stream.indentation()
      }
      if (stream.eatSpace()) return null
      const style = state.tokenize(stream, state)

      if (style != "comment" && state.context && state.context.align == null && state.context.type != "pattern") {
        state.context.align = true
      }

      if (curPunc == null) {
        return style
      } else if (curPunc == "(") {
        pushContext(state, ")", stream.column())
      } else if (curPunc == "[") {
        pushContext(state, "]", stream.column())
      } else if (curPunc == "{") {
        pushContext(state, "}", stream.column())
      } else if (/[\]})]/.test(curPunc)) {
        while (state.context && state.context.type == "pattern") popContext(state)
        if (state.context && curPunc == state.context.type) {
          popContext(state)
          if (curPunc == "}" && state.context && state.context.type == "pattern") {
            popContext(state)
          }
        }
      } else if (curPunc == "." && state.context && state.context.type == "pattern") {
        popContext(state)
        // } else if (/atom|string|variable/.test(style) && state.context) {
      } else if (/tag|string|variable/.test(style) && state.context) {
        if (/[}\]]/.test(state.context.type)) {
          if (!/^select\s|^describe\s|^from\s/.test(stream.string.toLowerCase().replace(/^\s+/, ""))) {
            pushContext(state, "pattern", stream.column())
          }
        } else if (state.context.type == "pattern" && !state.context.align) {
          state.context.align = true
          state.context.col = stream.column()
          // indent for "[" brank node
          if (
            state.context.prev &&
            state.context.prev.type == "]" &&
            (/;\s*$/.exec(stream.string) || /;\s*#/.exec(stream.string))
          ) {
            const tempMatch01 = /^(\s*)/.exec(stream.string)

            if (tempMatch01 != null) {
              state.context.col = tempMatch01[1].length
            }

            const tempMatch02 = /^(.*\[\s*)[^\s]+\s+[^\s]+\s*;/.exec(stream.string)

            if (/\[\s*[^\s]+\s+[^\s]+\s*;/.exec(stream.string) && tempMatch02) {
              state.context.col = tempMatch02[1].length
            }
          }
        }
      }
      return style
    },

    indent: function (state: State, textAfter: string): number {
      const firstChar = textAfter && textAfter.charAt(0)
      let context = state.context
      if (/[\]}]/.test(firstChar)) {
        while (context && context.type == "pattern") {
          context = context.prev
        }
      }

      const closing = context && firstChar == context.type
      if (!context) {
        return 0
      } else if (context.type == "pattern") {
        return context.col
      } else if (context.align) {
        return context.col + (closing ? 0 : 1)
      } else {
        return context.indent + (closing ? 0 : indentUnit)
      }
    },

    lineComment: "#"
  }
}

export default defineSparqlMode
