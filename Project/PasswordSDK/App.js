import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import PasswordStrengthMeterTest from "./PasswordStrengthMeterTest";

export default function App() {
  return (
    <View style={styles.container}>
      <PasswordStrengthMeterTest />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
