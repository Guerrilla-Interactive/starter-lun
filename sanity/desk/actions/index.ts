import { SINGLETON_DOC_TYPES } from "@/sanity/schemas/sanity.consts"
import type { DocumentActionComponent, DocumentActionsContext } from "sanity"

export const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
])

export const actions = (
  actions: DocumentActionComponent[],
  context: DocumentActionsContext
) => {
  if (SINGLETON_DOC_TYPES.includes(context.schemaType)) {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    return actions.filter(
      ({ action }) => action && singletonActions.has(action)
    )
  }

  return actions
}
