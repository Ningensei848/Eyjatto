import { compile } from '@mdx-js/mdx'
import { MDXCompileOptions } from 'consts'

export const mdxCompile = async (mdContent: string) =>
  String(
    // cf. https://mdxjs.com/packages/mdx/#compilefile-options
    await compile(mdContent, {
      ...MDXCompileOptions,
      outputFormat: 'function-body'
    })
  )
