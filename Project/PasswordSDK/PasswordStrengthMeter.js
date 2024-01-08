import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

// Show whether a password criteria has been met
const PasswordCriteria = ({ isValid, text }) => (
  <Text style={[styles.criteria, isValid ? styles.valid : styles.invalid]}>
    {isValid ? "✓" : "✗"} {text}
  </Text>
);

// Simple algorithm to calculate password strength
const defaultStrengthAlgorithm = (criteria) => {
  // We start with zero strength and increase it by 20 for each criteria met
  let strength = 0;
  Object.values(criteria).forEach((isValid) => {
    if (isValid) strength += 20;
  });
  return strength; // The strength is a score out of 100
};

// Main component for the password strength meter
const PasswordStrengthMeter = ({
  // The default props for our component
  minLength = 8,
  maxLength = 50,
  requireUpperCase = true,
  requireLowerCase = true,
  requireNumbers = true,
  requireSpecialChars = true,
  allowedSpecialChars = "!@#$%^&*",
  customStrengthAlgorithm = null,
  strengthBarColors = {
    weak: "red",
    fair: "orange",
    good: "yellow",
    strong: "lightgreen",
    veryStrong: "green",
  },
}) => {
  const [password, setPassword] = useState(""); // This state holds the input from our text field

  // We check the password against our criteria every time it changes
  const passwordCriteria = {
    length: password.length >= minLength && password.length <= maxLength,
    upper: requireUpperCase && /[A-Z]/.test(password),
    lower: requireLowerCase && /[a-z]/.test(password),
    number: requireNumbers && /\d/.test(password),
    special:
      requireSpecialChars &&
      new RegExp(`[${allowedSpecialChars}]`).test(password),
  };

  // We calculate the strength of the password using either the default algorithm or a custom one
  const strength = customStrengthAlgorithm
    ? customStrengthAlgorithm(password, passwordCriteria)
    : defaultStrengthAlgorithm(password, passwordCriteria);

  // This function determines the color of the strength bar based on the password strength
  const getPasswordStrengthBarStyle = () => {
    let barColor = strengthBarColors.weak; // Start with the weakest color

    // Then adjust the color based on how strong the password is
    if (strength >= 80) barColor = strengthBarColors.veryStrong;
    else if (strength >= 60) barColor = strengthBarColors.strong;
    else if (strength >= 40) barColor = strengthBarColors.good;
    else if (strength >= 20) barColor = strengthBarColors.fair;

    // Ensure the strength does not exceed 100
    const strengthPercentage = Math.min(strength, 100);

    // Return the style for the strength bar
    return {
      width: `${strengthPercentage}%`, // The width of the bar represents the strength, capped at 100%
      backgroundColor: barColor, // The color represents the strength level
      height: 10,
    };
  };

  return (
    <View style={styles.container}>
      {/* Input field for the password */}
      <TextInput
        style={styles.input}
        onChangeText={setPassword} // Update the password state as the user types
        value={password} // Display the current password value
        secureTextEntry // Hide password content
        placeholder="Enter your password..." // Prompt text for users
      />
      {/* Container for the visual strength bar */}
      <View style={styles.strengthBarContainer}>
        {/* The colored bar indicating password strength */}
        <View style={getPasswordStrengthBarStyle()} />
      </View>
      {/* List of criteria the password is being checked against */}
      <View style={styles.criteriaList}>
        {/* Check for minimum length */}
        <PasswordCriteria
          isValid={passwordCriteria.length}
          text={`At least ${minLength} characters`}
        />
        {/* Check for uppercase characters */}
        {requireUpperCase && (
          <PasswordCriteria
            isValid={passwordCriteria.upper}
            text="One uppercase letter"
          />
        )}
        {/* Check for lowercase characters */}
        {requireLowerCase && (
          <PasswordCriteria
            isValid={passwordCriteria.lower}
            text="One lowercase letter"
          />
        )}
        {/* Check for numeric characters */}
        {requireNumbers && (
          <PasswordCriteria
            isValid={passwordCriteria.number}
            text="One number"
          />
        )}
        {/* Check for special characters */}
        {requireSpecialChars && (
          <PasswordCriteria
            isValid={passwordCriteria.special}
            text={`One special character (${allowedSpecialChars})`}
          />
        )}
      </View>
    </View>
  );
};

// Here we define the styles used in our component
const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  criteria: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 2,
  },
  valid: {
    color: "green",
  },
  invalid: {
    color: "red",
  },
  criteriaList: {
    marginBottom: 10,
  },
  strengthBarContainer: {
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default PasswordStrengthMeter;
