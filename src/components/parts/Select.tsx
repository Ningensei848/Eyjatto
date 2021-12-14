import { InputBase, InputAdornment, NativeSelect } from '@mui/material'
import { FormatListBulleted as ListIcon } from '@mui/icons-material'

import type { ReactNode } from 'react'

const SelectForm = (props: {
  children: ReactNode
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  [key: string]: unknown
}) => {
  const { value, onChange, children } = props
  return (
    <NativeSelect
      value={value}
      onChange={onChange}
      input={
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          startAdornment={
            <InputAdornment position='start'>
              <ListIcon />
            </InputAdornment>
          }
        />
      }
    >
      {children}
    </NativeSelect>
  )
}

export default SelectForm
