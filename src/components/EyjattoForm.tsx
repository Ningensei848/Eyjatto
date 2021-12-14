import { Fragment, useState } from 'react'
import {
  Box,
  Paper,
  Divider,
  IconButton,
  LinearProgress,
  CircularProgress,
  Collapse
} from '@mui/material'
import { Visibility as VisibleIcon, VisibilityOff as HiddenIcon } from '@mui/icons-material'

import { useAppSelector, useQueryExecute } from 'libs/hooks'
import { formConfigSelectors } from 'stores/formConfigSlice'

import ConfigurableElement from './ConfigurableElement'
import QueryEditable from './parts/QueryEditable'

import type { FormElement } from 'types/eyjatto'

const FormLoading = (): JSX.Element => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
)
const FormDivider = (): JSX.Element => (
  <Divider sx={{ height: '2rem', m: '0.25rem' }} orientation='vertical' />
)

const VisibilityIcon = ({
  status,
  setStatus
}: {
  status: boolean
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => (
  // 裏側のクエリを見せても良い場合は，フラグをONにして表示用のボタンを設置
  <>
    <FormDivider />
    <IconButton
      aria-label='query-visibility'
      onClick={() => (status ? setStatus(false) : setStatus(true))}
    >
      {status ? <HiddenIcon /> : <VisibleIcon />}
    </IconButton>
  </>
)

const EyjattoForm = (props: { id: string; hideQuery?: boolean }): JSX.Element => {
  const { id, hideQuery } = props
  const [visibility, setVisibility] = useState(false)
  const formConfigState = useAppSelector((state) => formConfigSelectors.selectById(state, id))
  if (!formConfigState) return <FormLoading />
  const { form, endpoint } = formConfigState.config

  const QueryLoading = (): JSX.Element => {
    // TODO: endpoint が複数ある場合も想定 → useQueryExecute 内部で state を取得する方針へ変更したい
    // isLoading じゃないときのスペース確保；現状はガタつくので
    const { isLoading } = useQueryExecute({ id, endpoint }) // TODO: isError なときのアラート処理
    return isLoading ? <LinearProgress /> : <></>
  }

  const QueryCollapse = (): JSX.Element => (
    <Collapse in={visibility}>
      <Box my={1} sx={{ width: '100%' }}>
        <QueryEditable id={id} />
      </Box>
    </Collapse>
  )

  return (
    <>
      <Paper
        component='form'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
      >
        {form.map((element: FormElement, idx: number) => (
          <Fragment key={element.param.name}>
            <ConfigurableElement id={id} config={element} />
            {/* 複数のフォームがある場合，それらの間に縦棒を置いて仕切る */}
            {idx + 1 !== form.length && <FormDivider />}
          </Fragment>
        ))}
        {hideQuery || <VisibilityIcon status={visibility} setStatus={setVisibility} />}
      </Paper>
      <QueryLoading />
      {hideQuery || <QueryCollapse />}
    </>
  )
}

export default EyjattoForm
