/*
import { eyjattoConfigSchema, formElementSchema } from './schema'
import type { JTDDataType } from 'ajv/dist/jtd'

export type EyjattoConfig = JTDDataType<typeof eyjattoConfigSchema>
export type FormElement = JTDDataType<typeof formElementSchema>
*/

interface Attributes {
  type: string
  [key: string]: string
}

interface ParamDict {
  from: 'dict'
  keywords: { [key: string]: string }
  name: string
  attributes?: Attributes
}

interface ParamList {
  from: 'list'
  keywords: string[]
  name: string
  attributes?: Attributes
}

type Param = ParamDict | ParamList

export interface FormElement {
  element: string
  param: Param
}

export interface EyjattoConfig {
  endpoint: string
  form: FormElement[]
}
