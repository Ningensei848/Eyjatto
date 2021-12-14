/*
import type { JTDDataType } from 'ajv/dist/jtd'
import { IndexPropsSchema } from './schema'

export type IndexProps = JTDDataType<typeof IndexPropsSchema>
export type SPARQLetProps = JTDDataType<typeof SPARQLetPropsSchema>
 */

import type { EyjattoConfig } from './eyjatto'
import type { Metadata } from './markdown'

export interface SPARQLetProps {
  config: EyjattoConfig
  content: string
  meta: Metadata
  query: string
}
