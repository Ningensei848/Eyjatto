import { Param } from './configParam'

const formElementSchema = {
  properties: {
    element: {
      // 'textInput', 'selector', 'autocomplete' and more
      type: 'string'
    },
    param: { ref: 'param' }
  }
} as const

export const eyjattoConfigSchema = {
  definitions: {
    param: Param
  },
  properties: {
    // 複数エンドポイント指定できたとして，何が嬉しいの？（複数箇所へのクエリが必要なら，それはクエリ内部に書くべき）
    endpoint: { type: 'string' },
    form: {
      elements: formElementSchema
    }
  }
} as const
