import React, { useState } from "react";
import { View, TextInput, ScrollView, Text, StyleSheet } from "react-native";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const PasswordStrengthMeterTest = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState(""); // Separate state variable for password2
  const [password3, setPassword3] = useState("");

  // Three custom words and thresholds
  const threeLevels = [
    { label: "Weak", threshold: 30, color: "red" },
    { label: "Fair", threshold: 60, color: "yellow" },
    { label: "Strong", threshold: 100, color: "green" },
  ];

  // Five custom words and thresholds
  const fiveLevels = [
    { label: "That's very weak...", threshold: 20, color: "red" },
    { label: "You can do better!", threshold: 40, color: "orange" },
    { label: "Not bad at all!", threshold: 60, color: "yellow" },
    { label: "Perfect!", threshold: 80, color: "lightgreen" },
    { label: "WOW excellent!!", threshold: 100, color: "green" },
  ];

  // Basic strength algorithm with a roof
  const basicAlgorithm = (password) => {
    const maxLength = 10; // Maximum password length for 100% strength
    const lengthPercentage = (password.length / maxLength) * 100;
    const score = Math.min(Math.floor(lengthPercentage), 100);
    return score;
  };

  // Advanced strength algorithm
  const advancedAlgorithm = (password) => {
    // Define factors to consider
    const factors = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digits: /\d/.test(password),
      specialChars: /[!@#$%^&*]/.test(password),
    };

    // Calculate score based on factors
    let score = 0;
    if (factors.length) score += 20;
    if (factors.uppercase) score += 20;
    if (factors.lowercase) score += 20;
    if (factors.digits) score += 15;
    if (factors.specialChars) score += 25;

    return score;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>
          Three custom words with basic and advanced algorithm
        </Text>
        <TextInput
          onChangeText={setPassword1}
          value={password1}
          placeholder="Enter your password"
          secureTextEntry
          style={[styles.input, styles.roundedInput]} // Apply rounded border style
        />
        <PasswordStrengthMeter
          password={password1}
          score={basicAlgorithm(password1)} // Basic algorithm for three words
          customStrengthLevels={threeLevels} // Use custom strength levels
        />
        <PasswordStrengthMeter
          password={password1}
          score={advancedAlgorithm(password1)} // Advanced algorithm for three words
          customStrengthLevels={threeLevels} // Use custom strength levels
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.title}>
          Five custom words with basic and advanced algorithm
        </Text>
        <TextInput
          onChangeText={setPassword2}
          value={password2} // Use password2 state variable
          placeholder="Enter your password"
          secureTextEntry
          style={[styles.input, styles.roundedInput]} // Apply rounded border style
        />
        <PasswordStrengthMeter
          password={password2} // Use password2 state variable
          score={basicAlgorithm(password2)} // Basic algorithm for five words
          customStrengthLevels={fiveLevels} // Use custom strength levels
        />
        <PasswordStrengthMeter
          password={password2} // Use password2 state variable
          score={advancedAlgorithm(password2)} // Advanced algorithm for five words
          customStrengthLevels={fiveLevels} // Use custom strength levels
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  roundedInput: {
    borderRadius: 10, // Apply rounded border
  },
  title: {
    fontWeight: "bold", // Make the title text bold
    marginBottom: 10, // Add margin below the titles
  },
});

export default PasswordStrengthMeterTest;
