/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AtMark, AtTypes, Id } from "@/types/common"
import { FormOption, FormVariable, FormMode, FormNameList } from "@/types/form"
import { atMarkList, formModeList, formNameList } from "@/util/nameList"

export const isId = (arg: any): arg is Id => {
  return ["string", "number"].includes(typeof arg) ? true : false
}
export const isAtMark = (arg: any): arg is AtTypes => {
  return atMarkList.includes(arg) ? true : false
}
export const isFormOptionName = (arg: any): arg is FormNameList => {
  return formNameList.includes(arg) ? true : false
}
export const isFormMode = (arg: any): arg is FormMode => {
  return formModeList.includes(arg) ? true : false
}

export const isExtractedAtMark = (arg: any): arg is AtMark => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { at, var_name, var_elem, opt_name, opt_elem, parent_id } = arg

  // 各要素は Verify され， boolean な値を返す．すべて true であることが期待される．
  const verificationList = [
    isAtMark(at) ? true : false,
    typeof var_name === "string" ? true : false,
    typeof var_elem === "string" ? true : false,
    // isFormOptionName(opt_name) ? true : false,
    // typeof opt_elem === 'string' ? true : false,
    typeof opt_name === "undefined" || isFormOptionName(opt_name) ? true : false,
    ["undefined", "string"].includes(typeof opt_elem) ? true : false,
    isId(parent_id) ? true : false
  ]
  // false が一つでも含まれていたら，false を返す（そうでなければ， true を返す）
  return verificationList.includes(false) ? false : true
}
export const isFormVariable = (arg: { [key: string]: any }): arg is FormVariable => {
  const { id, at, name, elem, parent_id } = arg

  // 各要素は Verify され， boolean な値を返す．すべて true であることが期待される．
  const idVerified = isId(id) ? true : false
  const atVerified = isAtMark(at) ? true : false
  const nameVerified = typeof name === "string" ? true : false
  const elemVerified = typeof elem === "string" || Array.isArray(elem) ? true : false
  const parentIdVerified = isId(parent_id) ? true : false
  // false が一つでも含まれていたら，false を返す（そうでなければ， true を返す）
  return [idVerified, atVerified, nameVerified, elemVerified, parentIdVerified].includes(false) ? false : true
}

export const isFormOption = (arg: { [key: string]: any }): arg is FormOption => {
  const { id, at, name, elem, parent_id } = arg

  // 各要素は Verify され， boolean な値を返す．すべて true であることが期待される．
  const idVerified = isId(id) ? true : false
  const atVerified = isAtMark(at) ? true : false
  // formOption.name は， formNameList にあるいずれか一つに一致していてほしい
  const nameVerified = isFormOptionName(name) ? true : false
  const elemVerified = typeof elem === "string" || Array.isArray(elem) ? true : false
  const parentIdVerified = isId(parent_id) ? true : false
  // false が一つでも含まれていたら，false を返す（そうでなければ， true を返す）
  return [idVerified, atVerified, nameVerified, elemVerified, parentIdVerified].includes(false) ? false : true
}
