/*
import type { JTDDataType } from 'ajv/dist/jtd'
import { JSONResponseSchema } from './schema'
export type JSONResponse = JTDDataType<typeof JSONResponseSchema>
*/

interface JsonresponseHead {
  link?: string[]
  vars?: string[]
}

interface JsonresponseResults {
  bindings: { [key: string]: Rdfterm }[]
}

type Rdfterm = RdftermBnode | RdftermLiteral | RdftermUri

interface RdftermBnode {
  type: 'bnode'
  value: string
}

interface RdftermLiteral {
  type: 'literal'
  value: string
  datatype?: string
  'xml:lang'?: string
}

interface RdftermUri {
  type: 'uri'
  value: string
}

export interface JSONResponse {
  head: JsonresponseHead
  boolean?: boolean
  results?: JsonresponseResults
}
