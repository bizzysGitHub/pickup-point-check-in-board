"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import type { PropsWithChildren } from "react";
import { apolloClient } from "@/lib/apollo/client";

export function ApolloProvider({ children }: PropsWithChildren) {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
}
