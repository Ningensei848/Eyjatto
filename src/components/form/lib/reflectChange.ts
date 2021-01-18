import { setFormVariable, setFormOption } from "@/components/form/formSlice"
import { reflectChangeProps } from "@/types/form"
import debounce from "lodash.debounce"
import { batch as batchDispatch } from "react-redux"

// form.LocalState の変更を受け取って， global な FormVariable / FormOption を更新する． ----------------------------------
const dispatchLocalFormChanges = (props: reflectChangeProps): void => {
  const { id, at, variable, option, dispatch, parent_id } = props

  batchDispatch(() => {
    dispatch(setFormVariable({ id: id, at: at, name: variable.name, elem: variable.elem, parent_id: parent_id }))
    if (option) {
      dispatch(setFormOption({ id: id, at: at, name: option.name, elem: option.elem, parent_id: parent_id }))
    }
  })
}
// ---------------------------------------------------------------------------------------------------------------------

// form.LocalState の変更を受け取って， dispatchLocalFormChanges に引き渡す． ---------------------------------------------
const delayMillisecond = 700 // delay time
export const reflectChanges = debounce(
  // eslint-disable-next-line @typescript-eslint/require-await
  async (props: reflectChangeProps) => dispatchLocalFormChanges(props),
  delayMillisecond
)
// ---------------------------------------------------------------------------------------------------------------------
