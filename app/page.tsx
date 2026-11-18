import { ApolloProvider } from "./providers";
import { InboundDashboard } from "@/features/inbound-dashboard/components/InboundDashboard";

export default function Home() {
  return (
    <ApolloProvider>
      <InboundDashboard />
    </ApolloProvider>
  );
}
