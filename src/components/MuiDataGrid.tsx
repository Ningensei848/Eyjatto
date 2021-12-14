// TODO: rows < 100 制限を複数タブにして回避する https://mui.com/components/tabs/#prevent-scroll-buttons

import { ReactNode, useState } from 'react'
import { Box } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridToolbar,
  GridRenderCellParams
} from '@mui/x-data-grid'

import { MOBILE_WIDTH } from 'consts'
import Link from 'components/Link'
import NoRowsDataGrid from 'components/parts/NoRowsDataGrid'
import MobileToolbar from 'components/parts/MobileTootbar'
import { isValidUrl } from 'libs/validator'
import { useAppSelector, useWindowSize } from 'libs/hooks'
import { resultSelectors } from 'stores/resultSlice'

const pattern_hankaku = /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/

const FlexFrame = ({ children }: { children: ReactNode }): JSX.Element => (
  <Box my={2} sx={{ display: 'flex', height: '100%' }}>
    <Box sx={{ flexGrow: 1 }}>{children}</Box>
  </Box>
)

const renderCell = (params: GridRenderCellParams<string>) => {
  const url = params.value
  return isValidUrl(url) ? (
    <Link href={url} target='_blank' rel='noopener noreferrer'>
      {url}
    </Link>
  ) : (
    params.value
  )
}

// TODO: Prefixies をもらってURLの見た目を短縮
const MuiDataGrid = (props: { id: string }): JSX.Element => {
  const { id } = props
  const { width: viewportWidth } = useWindowSize()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const resultState = useAppSelector((state) => resultSelectors.selectById(state, id))
  const data = resultState && resultState.data

  if (!data) return <NoRowsDataGrid />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { head, results, boolean } = data // TODO: handling `boolean`
  if (!results || !head || !results.bindings.length) return <NoRowsDataGrid />
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { vars, link } = head // TODO: handling `link`
  if (!vars) return <NoRowsDataGrid />

  const widthCount: { [key: string]: number[] } = Object.fromEntries(vars.map((name) => [name, []]))

  const rows: GridRowModel[] = results.bindings.map((elem, id) => {
    // i 番目の列の最大値とカラム幅をあわせたい
    const obj = Object.fromEntries(
      Object.entries(elem).map(([key, val]) => {
        // 英数字のみならそのまま，全角が含まれれば（暫定的に）２倍の幅があると仮定: 1rem = 16px が基準？
        const v = val.value
        widthCount[key].push(pattern_hankaku.test(v) ? 8 * v.length : 16 * v.length)
        return [key, v]
      })
    )
    return { ...obj, id }
  })

  const columns: GridColDef[] = vars.map((varName) => {
    const longestValue = widthCount[varName].reduce((a, b) => Math.max(a, b))
    const minWidth = Math.min(longestValue, 400)

    return {
      field: varName,
      hide: false,
      minWidth,
      renderCell
    }
  })

  // Flex Layout: cf. https://mui.com/components/data-grid/layout/#flex-layout
  return (
    <FlexFrame>
      <DataGrid
        autoHeight={true}
        rows={rows}
        columns={columns}
        pagination
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: viewportWidth < MOBILE_WIDTH ? MobileToolbar : GridToolbar
        }}
        columnBuffer={2}
        columnThreshold={2}
        checkboxSelection
        disableSelectionOnClick // cf. https://mui.com/components/data-grid/selection/#disable-selection-on-click
      />
    </FlexFrame>
  )
}

export default MuiDataGrid
