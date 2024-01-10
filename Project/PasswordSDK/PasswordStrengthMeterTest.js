import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const PasswordStrengthMeterTest = () => {
  const threeLevels = [
    { label: "Weak", threshold: 30, color: "red" },
    { label: "Fair", threshold: 60, color: "yellow" },
    { label: "Strong", threshold: 100, color: "green" },
  ];

  const fiveLevels = [
    { label: "That's very weak...", threshold: 20, color: "red" },
    { label: "You can do better!", threshold: 40, color: "orange" },
    { label: "Not bad at all!", threshold: 60, color: "yellow" },
    { label: "Perfect!", threshold: 80, color: "lightgreen" },
    { label: "WOW excellent!!", threshold: 100, color: "green" },
  ];

  const basicAlgorithm = (password) => {
    const maxLength = 10;
    const lengthPercentage = (password.length / maxLength) * 100;
    return Math.min(Math.floor(lengthPercentage), 100);
  };

  const advancedAlgorithm = (password) => {
    let score = 0;
    score += password.length >= 8 ? 20 : 0;
    score += /[A-Z]/.test(password) ? 20 : 0;
    score += /[a-z]/.test(password) ? 20 : 0;
    score += /\d/.test(password) ? 15 : 0;
    score += /[!@#$%^&*]/.test(password) ? 25 : 0;
    return score;
  };

  const handlePasswordChange = (password, number) => {
    console.log(`Password ${number}:`, password);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Three custom strength levels with basic algorithm
      </Text>
      <PasswordStrengthMeter
        scoreAlgorithm={basicAlgorithm}
        customStrengthLevels={threeLevels}
        onPasswordChange={(password) => handlePasswordChange(password, 1)}
        backgroundColor="lightgreen" // Change the background color here
      />

      <Text style={styles.title}>
        Three custom strength levels with advanced algorithm
      </Text>
      <PasswordStrengthMeter
        scoreAlgorithm={advancedAlgorithm}
        customStrengthLevels={threeLevels}
        onPasswordChange={(password) => handlePasswordChange(password, 1)}
        backgroundColor="lightgreen" // Change the background color here
      />

      <Text style={styles.title}>
        Five custom strength levels with basic algorithm
      </Text>
      <PasswordStrengthMeter
        scoreAlgorithm={basicAlgorithm}
        customStrengthLevels={fiveLevels}
        onPasswordChange={(password) => handlePasswordChange(password, 2)}
        backgroundColor="lightblue" // Change the background color here
      />

      <Text style={styles.title}>
        Five custom strength levels with advanced algorithm
      </Text>
      <PasswordStrengthMeter
        scoreAlgorithm={advancedAlgorithm}
        customStrengthLevels={fiveLevels}
        onPasswordChange={(password) => handlePasswordChange(password, 2)}
        backgroundColor="lightblue" // Change the background color here
      />
      <Text style={styles.title}>
        Default strength levels with advanced algorithm
      </Text>
      <PasswordStrengthMeter
        scoreAlgorithm={advancedAlgorithm}
        onPasswordChange={(password) => handlePasswordChange(password, 3)}
        backgroundColor="lightpink" // Change the background color here
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default PasswordStrengthMeterTest;
