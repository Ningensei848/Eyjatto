import remarkGfm from 'remark-gfm' // Tables, footnotes, strikethrough, task lists, literal URLs.

import type { CompileOptions } from '@mdx-js/mdx'

export const MDX_DIR = process.env.MDX_DIR || 'sparqlets'
export const MDX_PAGE_PATH = process.env.MDX_PAGE_PATH || 'sparqlet'

export const MDXCompileOptions: CompileOptions = {
  // list-of-plugins
  // cf. https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins
  remarkPlugins: [remarkGfm]
}
