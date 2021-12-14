// cf. ja-JP: http://www.asahi-net.or.jp/~ax2s-kmtn/internet/rdf/REC-sparql11-results-json-20130321.html
// cf. org: https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/

const RDFTerm = {
  discriminator: 'type',
  mapping: {
    uri: {
      properties: {
        value: { type: 'string' }
      }
    },
    literal: {
      properties: {
        value: { type: 'string' }
      },
      optionalProperties: {
        'xml:lang': { type: 'string' },
        datatype: { type: 'string' }
      }
    },
    bnode: {
      properties: {
        value: { type: 'string' }
      }
    }
  }
} as const

const Results = {
  properties: {
    bindings: {
      elements: {
        values: RDFTerm
      }
    }
  },
  additionalProperties: true
} as const

const Head = {
  optionalProperties: {
    vars: { elements: { type: 'string' } },
    link: { elements: { type: 'string' } }
  },
  additionalProperties: true
} as const

/*
 * The results of a SPARQL Query are serialized in JSON as a single top-level JSON object.
 * This object has a "head" member and either a "results" member or a "boolean" member, depending on the query form.
 */
export const JSONResponseSchema = {
  properties: {
    head: Head
  },
  optionalProperties: {
    results: Results,
    boolean: { type: 'boolean' }
  }
} as const
