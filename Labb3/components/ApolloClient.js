// apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { GITHUB_TOKEN } from "react-native-dotenv";

const httpLink = new HttpLink({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
