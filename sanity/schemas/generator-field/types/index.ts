import type { FieldDefinitionBase } from "sanity"

export type Field<T> = Omit<T, "type"> &
  FieldDefinitionBase & {
    required?: boolean
  }
