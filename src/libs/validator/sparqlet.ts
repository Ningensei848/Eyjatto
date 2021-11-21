import { ajv } from './util'
import { sparqletSchema } from '../../schemas/sparqlet'
import { Sparqlet } from '../../types'

/*
 ** validate is a type guard for Sparqlet - type is inferred from sparqletSchema type
 */
export const sparqletIsValid = ajv.compile<Sparqlet>(sparqletSchema)
/*
 ** serialize will only accept data compatible with Sparqlet
 */
export const sparqletSerialize = ajv.compileSerializer<Sparqlet>(sparqletSchema)
/*
 ** parse will return Sparqlet or undefined
 */
export const sparqletParse = ajv.compileParser<Sparqlet>(sparqletSchema)
