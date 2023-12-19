// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RepositoryList from "../components/RepoList";
import RepositoryDetails from "../components/RepoDetails";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="List" component={RepositoryList} />
      <Stack.Screen name="Details" component={RepositoryDetails} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
