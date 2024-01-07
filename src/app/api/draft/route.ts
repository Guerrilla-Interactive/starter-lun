// ./app/api/draft/route.ts

import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { client } from "@/sanity/client";
import { sanityAPIToken } from "@/sanity/token";

const clientWithToken = client.withConfig({ token: sanityAPIToken });

export async function GET(request: Request) {

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );
  if (!isValid) {
    return new Response(`Invalid secret ${request.url}`, { status: 401 });
  }

  draftMode().enable();
  redirect(redirectTo);

}
