import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RepositoryList from "./RepositoryList";
// Other imports as necessary...

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="RepositoryList" component={RepositoryList} />
      {/* Other screens... */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
