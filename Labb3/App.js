// App.js
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./components/ApolloClient";
import AppNavigator from "./components/AppNavigator";
import TestComponent from "./components/TestComponent";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TestComponent />
    </ApolloProvider>
  );
}
