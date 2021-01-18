// -------------------------------------------
// cf. ja-JP: http://www.asahi-net.or.jp/~ax2s-kmtn/internet/rdf/REC-sparql11-results-json-20130321.html
// cf. org: https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

type Id = import("@/types/common").Id

export interface IRI {
  type: "uri"
  value: string
}
export interface Literal {
  type: "literal"
  value: string
}
export interface LiteralWithLanguageTag {
  type: "literal"
  value: string
  "xml:lang": string
}
export interface LiteralWithDatatypeIRI {
  type: "literal"
  value: string
  datatype: string
}
export interface Blank {
  type: "bnode"
  value: string
}

export type RDFTerm = IRI | Literal | LiteralWithLanguageTag | LiteralWithDatatypeIRI | Blank

export interface Results {
  bindings: { [key: string]: RDFTerm }
}
export interface Head {
  vars?: string[]
  link?: string[]
}
export interface ResultsMemberJSONResponse {
  head: Head
  results: Results
}
export interface BooleanMemberJSONResponse {
  head: Head
  boolean: boolean
}

// JSONResponse // ToDo: add other formats support: 1. CSV&TSV 2. XML
export type JSONResponse = ResultsMemberJSONResponse | BooleanMemberJSONResponse

export interface ResultSolution {
  id: Id
  data: JSONResponse
  // data: string // this format is JSON(, CSV&TSV or XML)
}

// Entities table ------------------------------
export interface ResultSolutionState {
  result: import("@reduxjs/toolkit").EntityState<ResultSolution>
}

// -----------------------------------------------------------------------------
// props -----------------------------------------------------------------------
export interface ResultSolutionProps {
  id: Id
  styleProps?: import("@/types/common").StylingProps
}
