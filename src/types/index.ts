import { JTDDataType } from 'ajv/dist/jtd'

import { eyjattoConfigSchema } from '../schemas/config'
import { elementSchema } from '../schemas/element'
import { JSONResponseSchema } from '../schemas/sparql'
import { sparqletSchema } from '../schemas/sparqlet'
import { Exclusive } from '../types/util'
export type { Exclusive }

export type FormElement = JTDDataType<typeof elementSchema>
export type EyjattoConfig = JTDDataType<typeof eyjattoConfigSchema>
export type Sparqlet = JTDDataType<typeof sparqletSchema>
export type JSONResponse = JTDDataType<typeof JSONResponseSchema>

export type EyjattoProps = {
    proxyURL?: string
} & Exclusive<
    { sparqletURL: string },
    {
        query: string
        config: EyjattoConfig
    }
>

export interface SPARQLetData {
    query: string
    config: EyjattoConfig
}
