/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormNameList } from "@/type/form"
import { atMarkList } from "@/util/nameList"

export type Id = string | number

export type AtTypes = typeof atMarkList[number]

export interface AtMark {
  at: AtTypes //'param' | 'endpoint' | 'proxy' | 'author' | 'title'
  var_name: string
  var_elem: string
  opt_name?: import("@/types/form").FormNameList
  opt_elem?: string
  parent_id: Id
}

// TODO: あとから拡張する
interface StylingTextInput {
  [key: string]: any
}
interface StylingTextArea {
  [key: string]: any
}
interface StylingToggleSwitch {
  [key: string]: any
}
interface StylingRangeSlider {
  [key: string]: any
}
interface StylingSelectBox {
  [key: string]: any
}
interface StylingRadioButton {
  [key: string]: any
}
interface StylingTimePicker {
  [key: string]: any
}
interface StylingDatePicker {
  [key: string]: any
}
interface StylingCheckBox {
  [key: string]: any
}

// -----------------------------------------------------------------------------
// props -----------------------------------------------------------------------

export interface StylingProps {
  checkBox?: StylingCheckBox
  textArea?: StylingTextArea
  selectBox?: StylingSelectBox
  textInput?: StylingTextInput | string
  datePicker?: StylingDatePicker
  timePicker?: StylingTimePicker
  radioButton?: StylingRadioButton
  rangeSlider?: StylingRangeSlider
  toggleSwitch?: StylingToggleSwitch
}
