import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

// Example custom strength algorithm
const customStrengthAlgorithm = (password) => {
  let strength = 0;
  if (password.length > 10) strength += 30;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/\d/.test(password)) strength += 20;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;
  return Math.min(strength, 100); // Ensure the strength doesn't exceed 100
};

const PasswordStrengthMeterTest = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.testLabel}>Default Configuration</Text>
      <View style={styles.testCase}>
        <PasswordStrengthMeter />
      </View>

      <Text style={styles.testLabel}>Minimum Length 12</Text>
      <View style={styles.testCase}>
        <PasswordStrengthMeter minLength={12} />
      </View>

      <Text style={styles.testLabel}>Custom Character Requirements</Text>
      <View style={styles.testCase}>
        <PasswordStrengthMeter
          requireUpperCase={false}
          requireLowerCase={true}
          requireNumbers={false}
          requireSpecialChars={true}
        />
      </View>

      <Text style={styles.testLabel}>Custom Strength Algorithm</Text>
      <View style={styles.testCase}>
        <PasswordStrengthMeter
          customStrengthAlgorithm={customStrengthAlgorithm}
        />
      </View>

      <Text style={styles.testLabel}>Custom Strength Bar Colors</Text>
      <View style={styles.testCase}>
        <PasswordStrengthMeter
          strengthBarColors={{
            weak: "blue",
            fair: "purple",
            good: "pink",
            strong: "orange",
            veryStrong: "cyan",
          }}
        />
      </View>

      {/* Add more test cases as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  testCase: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  testLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default PasswordStrengthMeterTest;
