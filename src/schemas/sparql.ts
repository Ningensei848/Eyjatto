// ~~~~~~~ 前略 ~~~~~~~
// cf. ja-JP: http://www.asahi-net.or.jp/~ax2s-kmtn/internet/rdf/REC-sparql11-results-json-20130321.html
// cf. org: https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

/*
 * export interface IRI {
 *     type: "uri"
 *     value: string
 * }
 */

/*
 * export interface Literal {
 *     type: "literal"
 *     value: string
 * }
 */

/*
 * export interface LiteralWithLanguageTag {
 *     type: "literal"
 *     value: string
 *     "xml:lang": string
 * }
 */

/*
 * export interface LiteralWithDatatypeIRI {
 *     type: "literal"
 *     value: string
 *     datatype: string
 * }
 */

/*
 * export interface Blank {
 *     type: "bnode"
 *     value: string
 * }
 */

/*
 * export type RDFTerm = IRI | Literal | LiteralWithLanguageTag | LiteralWithDatatypeIRI | Blank
 */

// const RDFTerm = {
//   discriminator: 'RDFTerm',
//   mapping: { IRI, Literal, LiteralWithLanguageTag, LiteralWithDatatypeIRI, Blank }
// } as const

const RDFTerm = {
    discriminator: 'type',
    mapping: {
        uri: {
            properties: {
                value: { type: 'string' },
            },
        },
        literal: {
            properties: {
                value: { type: 'string' },
            },
            optionalProperties: {
                'xml:lang': { type: 'string' },
                datatype: { type: 'string' },
            },
        },
        bnode: {
            properties: {
                value: { type: 'string' },
            },
        },
    },
} as const

/*
 * export interface Results {
 *     bindings: { [key: string]: RDFTerm }
 * }
 */

const Results = {
    properties: {
        bindings: {
            elements: {
                values: RDFTerm,
            },
        },
    },
    additionalProperties: true,
} as const

/*
 * export interface Head {
 *     vars?: string[]
 *     link?: string[]
 * }
 */

const Head = {
    optionalProperties: {
        vars: { elements: { type: 'string' } },
        link: { elements: { type: 'string' } },
    },
    additionalProperties: true,
} as const

/*
 * export interface ResultsMemberJSONResponse {
 *     head: Head
 *     results: Results
 * }
 */

/*
 * export interface BooleanMemberJSONResponse {
 *     head: Head
 *     boolean: boolean
 * }
 */

/*
 * export type JSONResponse = ResultsMemberJSONResponse | BooleanMemberJSONResponse
 */

/*
 * The results of a SPARQL Query are serialized in JSON as a single top-level JSON object.
 * This object has a "head" member and either a "results" member or a "boolean" member, depending on the query form.
 */
export const JSONResponseSchema = {
    properties: {
        head: Head,
    },
    optionalProperties: {
        results: Results,
        boolean: { type: 'boolean' },
    },
} as const
