import { Param } from './configParam'

export const formElementSchema = {
  definitions: {
    param: Param
  },
  properties: {
    element: {
      // 'textInput', 'selector', 'autocomplete' and more
      type: 'string'
    },
    param: { ref: 'param' }
  }
} as const
