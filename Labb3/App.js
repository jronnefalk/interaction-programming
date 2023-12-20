import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import * as Font from "expo-font";

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
