export const sparqletSchema = {
    properties: {
        pageProps: {
            properties: {
                meta: {
                    // front-matter object powered by grey-matter
                    values: {}, // allow any values
                },
                query: { type: 'string' },
                config: { type: 'string' },
            },
            additionalProperties: true,
        },
    },
    additionalProperties: true,
} as const
