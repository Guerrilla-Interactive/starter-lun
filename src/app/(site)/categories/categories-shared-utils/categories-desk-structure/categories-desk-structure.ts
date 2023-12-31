import { singletonListItem } from "@/sanity/desk/structure/utils/singleton-list-item.desk"
import { setIcon } from "@/src/components/utils/icon.component"
import { StructureBuilder, StructureResolverContext } from "sanity/desk"
import { Stool } from "@phosphor-icons/react"
import { categoriesIndexSchema } from "../../(index)/(categories-index-core)/(categories-index-server)/categories.index-schema"

export const categoriesDeskStructure = (
	S: StructureBuilder,
	_context: StructureResolverContext
) =>
	S.listItem()
		.title("Categories")
		.icon(setIcon(Stool))
		.child(
			S.list()
				.title("Categories")
				.items([
					S.listItem()
						.title("Categories")
						.icon(setIcon(Stool))
						.schemaType("category")
						.child(S.documentTypeList("category").title("All the categories!")),
					S.divider(),
					singletonListItem(S, categoriesIndexSchema),
				])
		)

