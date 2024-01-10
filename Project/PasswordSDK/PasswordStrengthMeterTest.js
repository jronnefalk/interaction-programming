import React, { useState } from "react";
import { View, TextInput } from "react-native";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const PasswordStrengthMeterTest = () => {
  const [password, setPassword] = useState("");

  // Custom algorithm to calculate password strength
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  // Custom color scheme and labels
  const customColors = [
    "#FFC0CB", // Soft Pink
    "#FFA07A", // Light Orange
    "#FFD700", // Vibrant Yellow
    "#32CD32", // Fresh Green
    "#0000FF", // Deep Blue
    "#800080", // Rich Purple
  ];
  const customLabels = [
    "Way too weak...",
    "Still weak!",
    "Now we're getting somewhere",
    "That's quite alright!",
    "That's a strong one!!",
    "WOW NICE!",
  ];

  return (
    <View>
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      <PasswordStrengthMeter
        password={password}
        algorithm={calculateStrength}
        colorScheme={customColors}
        labels={customLabels}
      />
    </View>
  );
};

export default PasswordStrengthMeterTest;
