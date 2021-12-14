import { Parser } from 'sparqljs'

import Ajv from 'ajv/dist/jtd'

export const ajv = new Ajv()

// --------------------------------------------------------------------------------------
const pattern_http = /^https?:\/\//

export const isValidUrl = (url: string): boolean => {
  // validation: new URL(url) で typeError が発生するか否か
  try {
    new URL(pattern_http.test(url) ? url : '')
    return true
  } catch (e) {
    // const error =
    //   e instanceof TypeError ? e : new TypeError('Error ! on isValidUrl() : invalid url.')
    // console.error(`${error.name}: ${error.message}`)
    return false
  }
}

/** -------------------------------------------------------------------------------------
 * SparqlParser:
 * Creates a SPARQL parser with the given pre-defined prefixes and base IRI
 * @param options {
 *   prefixes?: { [prefix: string]: string },
 *   baseIRI?: string,
 *   factory?: import('rdf-js').DataFactory,
 *   sparqlStar?: boolean,
 *   skipValidation?: boolean,
 *   skipUngroupedVariableCheck?: boolean
 * }
 */

const sparqlParser = new Parser({ sparqlStar: true })

export const isValidQuery = (query: string): boolean => {
  // validation: sparql.js で parse 出来たかどうか？を基準とする
  try {
    sparqlParser.parse(query)
    return true
  } catch (error) {
    // console.error(error)
    return false
  }
}
