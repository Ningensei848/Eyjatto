import { access } from 'fs/promises'

export { mdxCompile } from './convert'
export { separateMdCodeBlocks } from './separate'
export { getMdIdList, getMdContentById } from './read'

export const TokensFilePath = `${process.cwd()}/.next/TempMdToken.json`

export const isMarkdownExtracted = async () => {
  try {
    await access(TokensFilePath)
    return true
  } catch {
    return false
  }
}
