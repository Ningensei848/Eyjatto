import { eyjattoConfigSchema } from './eyjattoConfig'

export const SPARQLetMetadataSchema = {
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    author: { type: 'string' },
    // emoji: "🔍"
    // type: "tech",
    topics: { elements: { type: 'string' } },
    published: { type: 'boolean' }
  },
  additionalProperties: true
} as const

export const SPARQLetPropsSchema = {
  properties: {
    meta: SPARQLetMetadataSchema,
    query: { type: 'string' },
    config: eyjattoConfigSchema,
    content: { type: 'string' }
  }
} as const
