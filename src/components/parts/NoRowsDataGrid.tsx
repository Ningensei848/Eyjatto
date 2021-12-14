import { Box } from '@mui/material'
import { DataGrid, GridOverlay } from '@mui/x-data-grid'

const NoRowsOverlay = () => {
  return (
    <GridOverlay>
      <div>No Data</div>
    </GridOverlay>
  )
}

const NoRowsDataGrid = () => (
  <Box my={2} sx={{ height: '40vh', width: '100%' }}>
    <DataGrid components={{ NoRowsOverlay, Pagination: null }} rows={[]} columns={[]} />
  </Box>
)

export default NoRowsDataGrid
