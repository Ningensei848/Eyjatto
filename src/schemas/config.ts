import { elementSchema } from '../schemas/element'

export const eyjattoConfigSchema = {
    properties: {
        endpoint: { type: 'string' },
        form: {
            elements: elementSchema,
        },
    },
} as const
