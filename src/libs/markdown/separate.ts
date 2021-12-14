// TODO: <details><summary> read more .. </summary></details> 内部のコードブロックのみを対象とする

const pattern_codeblock_sparql = /`{3}sparql([^]+?)`{3}/gi
const pattern_codeblock_json = /`{3}.*json([^]+?)`{3}/gi

export const separateMdCodeBlocks = (markdown: string) => {
  const m_sparql = pattern_codeblock_sparql.exec(markdown)
  const m_json = pattern_codeblock_json.exec(markdown)

  return {
    query: m_sparql ? m_sparql[1] : '',
    config: m_json ? m_json[1] : '',
    markdown: markdown
      .replace(pattern_codeblock_sparql, '')
      .replace(pattern_codeblock_json, '')
      .trim()
  }
}
