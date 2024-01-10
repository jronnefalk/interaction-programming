import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PasswordStrengthMeter = ({
  password,
  calculateStrength,
  colorScheme,
  labels,
  barWidth = "100%",
  showStrengthBar = true,
  showFeedbackText = false,
}) => {
  // If no custom function is provided, use a default one
  const strengthScore = calculateStrength
    ? calculateStrength(password)
    : defaultStrengthCalculation(password);
  const normalizedStrength = Math.min(
    Math.max(strengthScore, 0),
    labels.length - 1
  );
  const barColor = colorScheme[normalizedStrength];
  const strengthLabel = labels[normalizedStrength];

  const styles = StyleSheet.create({
    container: {
      width: barWidth,
      height: 10,
      backgroundColor: "#eee",
      borderRadius: 5,
      overflow: "hidden",
      marginTop: 10,
    },
    strengthBar: {
      width: `${(normalizedStrength / (labels.length - 1)) * 100}%`,
      height: "100%",
      backgroundColor: barColor,
    },
    label: {
      marginTop: 5,
      fontWeight: "bold",
    },
    feedbackText: {
      marginTop: 5,
      color: "gray",
    },
  });

  return (
    <View>
      {showStrengthBar && (
        <View style={styles.container}>
          <View style={styles.strengthBar} />
        </View>
      )}
      <Text style={styles.label}>Strength: {strengthLabel}</Text>
      {showFeedbackText && (
        <Text style={styles.feedbackText}>
          Tips to improve your password strength.
        </Text>
      )}
    </View>
  );
};

// Enhanced default algorithm for strength calculation
const defaultStrengthCalculation = (password) => {
  if (!password) return 0;
  let strengthPoints = 0;

  if (password.length >= 8) strengthPoints++; // Length >= 8
  if (password.length >= 12) strengthPoints++; // Length >= 12
  if (/[a-z]/.test(password)) strengthPoints++; // Contains lowercase
  if (/[A-Z]/.test(password)) strengthPoints++; // Contains uppercase
  if (/\d/.test(password)) strengthPoints++; // Contains number
  if (/[^A-Za-z0-9]/.test(password)) strengthPoints++; // Contains special character

  // Normalize to a scale of 0 to 5
  return Math.min(strengthPoints, 5);
};

export default PasswordStrengthMeter;
