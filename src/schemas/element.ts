// TODO: JTD file の読み込みの可能性を検証
export const elementSchema = {
    properties: {
        element: {
            // 'textInput', 'selector', 'autocomplete' and more
            type: 'string',
        },
        param: {
            properties: {
                name: {
                    type: 'string',
                },
            },
            optionalProperties: {
                keywords: {
                    elements: { type: 'string' },
                },
                attributes: {
                    // TODO: define schema for HTML Input attributes
                    // cf. https://developer.mozilla.org/ja/docs/Web/HTML/Element/input#attributes
                    // temporary definition
                    properties: {
                        type: {
                            type: 'string',
                        },
                    },
                    additionalProperties: true,
                },
            },
        },
    },
} as const
