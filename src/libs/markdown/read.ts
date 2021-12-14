import { opendir, readFile, writeFile } from 'fs/promises'
import matter from 'gray-matter'
import { hasOwnProps } from 'libs/common'

import { isMarkdownExtracted, TokensFilePath } from 'libs/markdown'
import type { Metadata, parsedMdContent } from 'types/markdown'

// If an $MARKDOWN_DIR is set, `markdownDir` is overridden.
const basePath = `${process.cwd()}/${process.env.MARKDOWN_DIR || 'sparqlets'}`
const pattern_markdown = /\.mdx?$/
const isMarkdownFile = (filename: string) => {
  return pattern_markdown.test(filename)
}
const filenameWithoutExt = (filename: string) => {
  return filename.replace(pattern_markdown, '')
}

const extractIdAndFilepath = async (basePath: string): Promise<{ [key: string]: string }> => {
  const dirents = await opendir(basePath)
  const pairs: { [key: string]: string } = {}
  for await (const dirent of dirents) {
    const name = dirent.name
    const targetPath = `${basePath}/${name}`

    if (dirent.isDirectory()) {
      // recursive
      for (const [key, value] of Object.entries(await extractIdAndFilepath(targetPath))) {
        pairs[key] = value
      }
    } else {
      if (!isMarkdownFile(name)) {
        continue
      } else {
        const fileContents = await readFile(targetPath, { encoding: 'utf-8' })
        const { data } = matter(fileContents)
        // If no ID is specified, the filename without extension is used as the ID.
        const id = hasOwnProps(data, 'id') ? data.id : filenameWithoutExt(name)
        pairs[id] = targetPath
      }
    }
  }

  return pairs
}

const createMdToken = async () => {
  const sparqlets = await extractIdAndFilepath(basePath)
  // Temporarily save to a file
  await writeFile(TokensFilePath, JSON.stringify(sparqlets))
}

const complementProps = (data: { [key: string]: any }): Metadata => {
  const randText = Math.random().toString(32).substring(2)

  return {
    id: hasOwnProps(data, 'id') ? data.id : randText,
    title: hasOwnProps(data, 'title') ? data.title : randText,
    author: hasOwnProps(data, 'author') ? data.author : 'unknown',
    topics: hasOwnProps(data, 'topics') ? data.topics : [],
    published: hasOwnProps(data, 'published') ? data.published : false
  }
}

export const getMdContentById = async (tokenId: string): Promise<parsedMdContent> => {
  if (!(await isMarkdownExtracted())) {
    // if token is not existed, then create it.
    await createMdToken()
  }

  const tokensFile = await readFile(TokensFilePath)
  const tokenObj = JSON.parse(tokensFile.toString())
  const filepath = tokenObj[tokenId] // to matkdown file
  const fileContents = await readFile(filepath, { encoding: 'utf-8' })
  const { data, content } = matter(fileContents)

  data.id = hasOwnProps(data, 'id') ? data.id : tokenId

  return { data: complementProps(data), content }
}

export const getMdIdList = async (): Promise<string[]> => {
  if (!(await isMarkdownExtracted())) {
    // if token is not existed, then create it.
    await createMdToken()
  }
  const tokensFile = await readFile(TokensFilePath)
  const tokenObj = await JSON.parse(tokensFile.toString())

  return Object.keys(tokenObj)
}
