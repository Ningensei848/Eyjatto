import axios from 'axios'

import { EyjattoConfig, EyjattoProps } from '../types'
import { eyjattoConfigIsValid, eyjattoConfigParse as parse } from '../libs/validator/config'
import { sparqletIsValid } from '../libs/validator/sparqlet'
import { useEffect, useState } from 'react'

const defaultConfig: EyjattoConfig = {
    endpoint: '/api/sparql',
    form: [
        {
            element: 'undefined',
            param: {
                name: 'none',
            },
        },
    ],
}

export const useSPARQLet = (
    props: EyjattoProps,
    setQuery: React.Dispatch<React.SetStateAction<string>>
): {
    config: EyjattoConfig
    isError: Error | undefined
} => {
    // cf. https://github.com/vercel/swr/discussions/939
    const { sparqletURL } = props
    const [config, setConfig] = useState<EyjattoConfig>(defaultConfig)
    const [isError, setError] = useState<Error>()

    useEffect(() => {
        void (async () => {
            if (!sparqletURL) {
                const { config, query } = props
                if (!query || !eyjattoConfigIsValid(config)) {
                    setError(new Error('EyjattoConfig is not valid. Please check your sparqlet.'))
                } else {
                    setConfig(config)
                    setQuery(query)
                }
            } else {
                await axios
                    .get(sparqletURL)
                    .then((res) => {
                        if (!sparqletIsValid(res.data))
                            throw new Error(
                                'Invalid server response: Please check your set URL or server status.'
                            )
                        const json = res.data
                        const config = parse(json.pageProps.config)

                        if (!eyjattoConfigIsValid(config)) {
                            throw new Error(
                                'EyjattoConfig is not valid. Please check your sparqlet.'
                            )
                        }
                        setConfig(config)
                        setQuery(json.pageProps.query)
                    })
                    .catch((error: Error) => {
                        setError(error)
                    })
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { config, isError }
    // -----------------------------------------------------------------
}
