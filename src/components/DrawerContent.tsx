import { useState } from 'react'

import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MDXContent from './MDXContent'
import FormConfigEditable from './parts/FormConfigEditable'

const TabNameList = ['readme', 'config']

const DrawerContent = ({ id, content }: { id: string; content: string }): JSX.Element => {
  const [tabName, setTabName] = useState(TabNameList[0])

  const handleChange = (_e: React.SyntheticEvent, name: string) => {
    setTabName(name)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={tabName}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant='fullWidth' onChange={handleChange} aria-label='SPARQLet details tab'>
            <Tab label={TabNameList[0]} value={TabNameList[0]} />
            <Tab label={TabNameList[1]} value={TabNameList[1]} />
          </TabList>
        </Box>
        <TabPanel value={TabNameList[0]}>
          <Box m={{ xs: 1, sm: 2 }}>
            <MDXContent content={content} />
          </Box>
        </TabPanel>
        <TabPanel value={TabNameList[1]}>
          <Box>
            <FormConfigEditable id={id} />
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default DrawerContent
