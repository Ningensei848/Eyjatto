import { SPARQLetMetadataSchema } from './sparqlet'

export { SPARQLetMetadataSchema, SPARQLetPropsSchema } from './sparqlet'
export { JSONResponseSchema } from './sparqlQueryResult'
export { eyjattoConfigSchema } from './eyjattoConfig'
export { formElementSchema } from './formElement'

// ----------------------------------------------------------------------------

export const IndexPropsSchema = {
  properties: {
    mdList: {
      elements: SPARQLetMetadataSchema
    }
  }
} as const
