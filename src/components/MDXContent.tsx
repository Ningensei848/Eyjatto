import { Fragment, useEffect, useState } from 'react'
import * as runtime from 'react/jsx-runtime.js'
import { run } from '@mdx-js/mdx'
import type { MDXModule } from 'mdx/types'
import { Box } from '@mui/material'

// cf. https://mdxjs.com/guides/mdx-on-demand/#nextjs-example

const MDXContent = (props: { content: string }) => {
  const { content } = props
  const [mdxModule, setMdxModule] = useState<MDXModule>()
  const Content = mdxModule ? mdxModule.default : Fragment

  useEffect(() => {
    void (async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
      setMdxModule(await run(content, runtime))
    })()
  }, [content])

  return (
    <Box
      component='article'
      className='markdown-body'
      // cf. https://github.com/sindresorhus/github-markdown-css#usage
      boxSizing='border-box'
      minWidth='200px'
      maxWidth='980px'
      margin='0 auto'
      padding={{ sm: 1 }}
    >
      <Content />
    </Box>
  )
}

export default MDXContent
