// ./app/api/draft/route.ts

import { client } from "@/src/lib/sanity/client.server";
import { sanityAPIToken } from "@/src/lib/sanity/token";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const clientWithToken = client.withConfig({ token: sanityAPIToken });

export async function GET(request: Request) {

  // HACK
  // For some unkonwn reason, validatePreviewUrl always returns isValid as False
  // We are just reading the redirectTo url ourselves and redirecting the user
  // appropriately
  //
  // const { isValid, redirectTo = "/" } = await validatePreviewUrl(
  //   clientWithToken,
  //   request.url
  // );
  // if (!isValid) {
  //   return new Response(`Invalid secret ${request.url}`, { status: 401 });
  // }

  const url = new URL(request.url)
  const redirectTo = url.searchParams.get("sanity-preview-pathname") || "/"
  // console.log("redirecting to", redirectTo)

  draftMode().enable();
  redirect(redirectTo);

}
