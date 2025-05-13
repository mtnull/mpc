import { ApolloClient, InMemoryCache } from "@apollo/client";

// Constants
const PORT = import.meta.env.VITE_BACKEND_PORT;
const HOST = import.meta.env.VITE_BACKEND_HOST || "localhost";

const uri = `http://${HOST}:${PORT}/graphql`;
export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
