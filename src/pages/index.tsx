import { Fragment } from 'react'
import { GetStaticProps } from 'next'
import { List, ListItemText, ListItemButton, Container, Box, Paper } from '@mui/material'

import { NextLinkComposed } from 'components/Link'
import { getMdIdList, getMdContentById } from 'libs/markdown'
import type { Metadata } from 'types/markdown'

// ルーティングの情報が入ったparamsを受け取る
export const getStaticProps: GetStaticProps = async () => {
  const markdownIdList = await getMdIdList()

  const markdownMetadataList = await Promise.all(
    markdownIdList.map(async (id) => {
      const { data } = await getMdContentById(id)
      return { ...data, id }
    })
  )

  return {
    props: { mdList: markdownMetadataList } // pass to page component as its props
  }
}

const Index = (props: { mdList: Metadata[] }) => {
  const { mdList } = props
  const markdowns = mdList.map((md: Metadata) => {
    // const { id, title, author, topics, published } = md;
    const { id, title, author, published } = md // topics
    if (!published) {
      return <Fragment key={id}></Fragment>
    } else {
      return (
        <ListItemButton key={id} component={NextLinkComposed} to={{ pathname: `/sparqlet/${id}` }}>
          <ListItemText primary={title} secondary={author} />
        </ListItemButton>
      )
    }
  })

  return (
    <Container maxWidth='lg'>
      <Paper>
        <Box sx={{ my: 4 }}>
          <List>{markdowns}</List>
        </Box>
      </Paper>
    </Container>
  )
}

export default Index
