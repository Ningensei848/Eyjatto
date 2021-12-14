import { ajv } from './util'
import { eyjattoConfigSchema } from 'types/schema'
import type { EyjattoConfig } from 'types/eyjatto'

/*
 ** validate is a type guard for EyjattoConfig - type is inferred from eyjattoConfigSchema type
 */
export const eyjattoConfigIsValid = ajv.compile<EyjattoConfig>(eyjattoConfigSchema)
/*
 ** serialize will only accept data compatible with EyjattoConfig
 */
export const eyjattoConfigSerialize = ajv.compileSerializer<EyjattoConfig>(eyjattoConfigSchema)
/*
 ** parse will return EyjattoConfig or undefined
 */
export const eyjattoConfigParse = ajv.compileParser<EyjattoConfig>(eyjattoConfigSchema)
