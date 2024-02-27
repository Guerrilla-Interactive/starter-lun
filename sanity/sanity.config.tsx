import { colorInput } from "@sanity/color-input"
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { media, mediaAssetSource } from "sanity-plugin-media"
import { clientEnv } from "@/env/client.mjs"
import { RequiredField } from "@/sanity/components/required-field.component"
import { actions } from "@/sanity/desk/actions"
import { initialValueTemplates } from "@/sanity/desk/initial-value-templates"
import { defaultDocumentNode } from "@/sanity/desk/site-preview/default-document-node.desk"
import { structure } from "@/sanity/desk/structure"
import { schemaTypes } from "@/sanity/schemas"
import { BASE_STUDIO_PATH } from "@/sanity/schemas/sanity.consts"
import { fathomTool } from "@/sanity/tools/fathom.tool"

import { presentationTool } from 'sanity/presentation'



const tools = []

// Conditionally add Fathom tool
if (clientEnv.NEXT_PUBLIC_FATHOM_ID) {
  tools.push(fathomTool())
}

export default defineConfig({
  basePath: `/${BASE_STUDIO_PATH}`,
  title: clientEnv.NEXT_PUBLIC_SITE_NAME,
  dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
  projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
  schema: {
    types: [...schemaTypes],
    templates: initialValueTemplates,
  },

  plugins: [
    deskTool({ defaultDocumentNode, structure }),
    media(),
    colorInput(),
    visionTool(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft'
        }
      }
    }),
  ],
  tools: tools,

  document: {
    actions: actions,
  },

  form: {
    components: {
      field: (props) => {
        if (props.schemaType?.options?.required) {
          return <RequiredField {...props} />
        }
        return props.renderDefault(props)
      },
    },

    image: {
      assetSources: () => [mediaAssetSource],
    },
    file: {
      assetSources: () => [mediaAssetSource],
    },
  },
})
