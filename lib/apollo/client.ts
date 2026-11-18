"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { mockSchema } from "@/features/inbound-dashboard/graphql/mockSchema";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: endpoint
    ? new HttpLink({ uri: endpoint })
    : new SchemaLink({ schema: mockSchema }),
});
