const Attributes = {
  // TODO: define schema for HTML Input attributes
  // cf. https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#attributes
  // temporary definition
  properties: {
    type: { type: 'string' }
  },
  additionalProperties: true
} as const

export const Param = {
  discriminator: 'from',
  mapping: {
    list: {
      properties: {
        name: { type: 'string' },
        keywords: {
          // type is `List`
          elements: { type: 'string' }
        }
      },
      optionalProperties: {
        attributes: Attributes
      }
    },
    dict: {
      properties: {
        name: { type: 'string' },
        keywords: {
          // type is `Dict`
          values: { type: 'string' }
        }
      },
      optionalProperties: {
        attributes: Attributes
      }
    }
  }
} as const
