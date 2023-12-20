import { createStackNavigator } from "@react-navigation/stack";
import RepositoryList from "../components/RepositoryList";
import RepositoryDetail from "../components/RepositoryDetail";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RepositoryList"
        component={RepositoryList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RepositoryDetail"
        component={RepositoryDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
