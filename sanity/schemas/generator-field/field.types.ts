export type FieldDef<T> = Omit<T, "type"> & {
  required?: boolean
  group?: string
}
