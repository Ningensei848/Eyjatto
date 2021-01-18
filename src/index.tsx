import { Editor } from "@/components/editor"
import { GeneratedForm } from "@/components/form"
import { EditorProps } from "@/types/editor"
import { GeneratedFormProps } from "@/types/form"
import React from "react"

interface rootProps {
  formProps: GeneratedFormProps
  editorProps: EditorProps
}

const Eyjatto: React.FC<rootProps> = (props) => {
  return (
    <>
      <GeneratedForm {...props.formProps} />
      <Editor {...props.editorProps} />
    </>
  )
}

export default Eyjatto
