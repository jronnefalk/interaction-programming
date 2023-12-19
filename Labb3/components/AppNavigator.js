import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RepositoryList from "./RepositoryList";
import RepositoryDetails from "./RepositoryDetails";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="RepositoryList" component={RepositoryList} />
      <Stack.Screen name="RepositoryDetails" component={RepositoryDetails} />
      {/* Other screens... */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
