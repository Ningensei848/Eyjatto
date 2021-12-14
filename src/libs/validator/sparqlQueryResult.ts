import { ajv } from './util'
import { JSONResponseSchema } from 'types/schema'

import type { JSONResponse } from 'types/sparqlQueryResult'

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
