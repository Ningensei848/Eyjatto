/*
import type { JTDDataType } from 'ajv/dist/jtd'
import { SPARQLetMetadataSchema } from './schema'
export type Metadata = JTDDataType<typeof SPARQLetMetadataSchema>
*/

export interface Metadata {
  author: string
  id: string
  published: boolean
  title: string
  topics: string[]
}

export type parsedMdContent = {
  data: Metadata
  content: string
}
