import { InputBase, InputAdornment } from '@mui/material'

import { Search as SearchIcon } from '@mui/icons-material'

const InputForm = (inputProps: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  [key: string]: unknown
}) => (
  <InputBase
    sx={{ ml: 1, flex: 1 }}
    inputProps={inputProps}
    startAdornment={
      <InputAdornment position='start'>
        <SearchIcon />
      </InputAdornment>
    }
  />
)

export default InputForm
