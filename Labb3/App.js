// App.js
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./components/ApolloClient";
import AppNavigator from "./components/AppNavigator";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigator />
    </ApolloProvider>
  );
}
