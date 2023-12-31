// ./sanity/lib/store.ts

import * as queryStore from "@sanity/react-loader";
import { client } from "./client.server";
import { sanityAPIToken } from "./token";

queryStore.setServerClient(client.withConfig({ token: sanityAPIToken }));

export const { loadQuery } = queryStore;
