import { useEffect } from 'react'
import { Container, Box } from '@mui/material'

import { getMdIdList, getMdContentById, mdxCompile, separateMdCodeBlocks } from 'libs/markdown'
import { eyjattoConfigIsValid as isValid, eyjattoConfigParse as eyjattoParse } from 'libs/validator'
import { useAppDispatch } from 'libs/hooks'
import { queryAdded } from 'stores/sparqlQuerySlice'
import { formConfigAdded } from 'stores/formConfigSlice'
import EyjattoForm from 'components/EyjattoForm'
import MuiDataGrid from 'components/MuiDataGrid'
import Drawer from 'components/Drawer'
import DrawerContent from 'components/DrawerContent'

import type { GetStaticPaths, GetStaticProps } from 'next/types'
import type { SPARQLetProps } from 'types/props'

// 最初に実行される。事前ビルドするパスを配列でreturnする。
// cf. https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths: GetStaticPaths = async () => {
  const markdowns = await getMdIdList() // default md dirctory is `${PROJECT_ROOT}/sparqlets`

  return {
    paths: markdowns.map((id) => {
      return {
        params: { id }
      }
    }),
    fallback: false
  }
}

// ルーティングの情報が入ったparamsを受け取る: { props: hogehoge } を Page Component にわたす
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const { data, content } = await getMdContentById(id)
  const { query, config, markdown } = separateMdCodeBlocks(content)

  const mdxContent = await mdxCompile(markdown || '')

  // config を parse する
  const eyjattoConfig = eyjattoParse(config)

  if (!isValid(eyjattoConfig)) {
    throw new Error(
      // error position in string and error message from the last parse call
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `config is not valid!\n${eyjattoParse.position}\n${eyjattoParse.message}\n`
    )
  }

  return {
    props: {
      meta: data,
      query,
      config: eyjattoConfig,
      content: mdxContent
    }
  }
}

const SPARQLet = (props: SPARQLetProps): JSX.Element => {
  const { meta, query: initialQuery, config, content } = props
  const { id } = meta // TODO: meta の id 以外の情報の活用
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(queryAdded({ id, query: initialQuery }))
    dispatch(formConfigAdded({ id, config }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container maxWidth='xl'>
      <Box mt={2}>
        <EyjattoForm id={id} />
        <MuiDataGrid id={id} />
      </Box>
      <Drawer>
        <DrawerContent id={id} content={content} />
      </Drawer>
    </Container>
  )
}

export default SPARQLet
