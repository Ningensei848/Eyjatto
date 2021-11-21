import { ajv } from './util'
import { elementSchema } from '~/src/schemas/element'
import type { FormElement } from '~/src/types'

/*
 ** validate is a type guard for FormElement - type is inferred from elementSchema type
 */
export const formElementIsValid = ajv.compile<FormElement>(elementSchema)
/*
 ** serialize will only accept data compatible with FormElement
 */
export const formElementSerialize = ajv.compileSerializer<FormElement>(elementSchema)
/*
 ** parse will return FormElement or undefined
 */
export const formElementParse = ajv.compileParser<FormElement>(elementSchema)