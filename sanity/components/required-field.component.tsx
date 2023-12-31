import type { FieldProps } from "sanity"

export const RequiredField = (props: FieldProps) => {
  return (
    <>
      {props.renderDefault({
        ...props,
        title: `${props.title} *`,
      })}
    </>
  )
}
