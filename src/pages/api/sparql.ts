import { isValidQuery, isValidUrl } from 'libs/validator'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { FetchOption } from 'consts'

/*
memo: `return` してもしなくても，handler の返り値は void である
  - return してやることで，それ以上処理をさせないようにしている
*/

// Initializing the cors middleware
const cors = Cors({
  // options: cf. https://github.com/expressjs/cors#configuration-options
  methods: ['GET', 'HEAD']
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const runMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const paramValidator = (queryParams: { endpoint?: string; query?: string }) => {
  const { endpoint, query } = queryParams
  // Bad Request: cf. https://developer.mozilla.org/ja/docs/Web/HTTP/Status/400
  // dream of dreams: http stream
  if (!query || Array.isArray(query)) {
    const message =
      'Bad Request: `query` can only accept one.' +
      `Your queries are ${JSON.stringify(query, null, '\t')}`
    return { message }
  } else if (!endpoint || Array.isArray(endpoint)) {
    const message =
      'Bad Request: `endpoint` can only accept one.' +
      `Your queries are ${JSON.stringify(endpoint, null, '\t')}`
    return { message }
  } else if (!isValidQuery(query) || !isValidUrl(endpoint)) {
    const message =
      'Bad Request: your endpoint or query, or both is invalid.' +
      `confirm your values:\n ${JSON.stringify({ endpoint, query }, null, '\t')}`
    return { message }
  } else {
    return {
      message: 'OK',
      params: { endpoint, query }
    }
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run the middleware
  await runMiddleware(req, res)

  if (req.method === 'POST') {
    const message = 'Method Not Allowed'
    return res.status(405).json({ message })
  } else {
    const { message, params } = paramValidator(req.query)
    if (!params) return res.status(400).json({ message })

    const { endpoint, query } = params
    const url = `${endpoint}?query=${encodeURIComponent(query)}`
    const response = await fetch(url, FetchOption)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await response.json()

    return res.status(200).json(data)
  }
}

export default handler
