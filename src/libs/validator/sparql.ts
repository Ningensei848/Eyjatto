import { Parser } from 'sparqljs'
import { JSONResponseSchema } from '../../schemas/sparql'
import { JSONResponse } from '../../types'
import { ajv } from './util'

/*
 ** validate is a type guard for JSONResponse - type is inferred from JSONResponseSchema type
 */
export const JSONResponseIsValid = ajv.compile<JSONResponse>(JSONResponseSchema)
/*
 ** serialize will only accept data compatible with JSONResponse
 */
export const JSONResponseSerialize = ajv.compileSerializer<JSONResponse>(JSONResponseSchema)
/*
 ** parse will return JSONResponse or undefined
 */
export const JSONResponseParse = ajv.compileParser<JSONResponse>(JSONResponseSchema)

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
        // console.log('Error ! sparql query syntax is invalid.')
        // console.error(error)
        return false
    }
}
