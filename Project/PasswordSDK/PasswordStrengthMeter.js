import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const PasswordCriteria = ({ isValid, text }) => (
  <Text style={[styles.criteria, isValid ? styles.valid : styles.invalid]}>
    {isValid ? "✓" : "✗"} {text}
  </Text>
);

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState("");

  const passwordCriteria = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    startWithLetter: /^[A-Za-z]/.test(password),
  };

  const getPasswordStrengthBarStyle = () => {
    const totalCriteria = Object.keys(passwordCriteria).length;
    const criteriaMet = Object.values(passwordCriteria).filter(Boolean).length;
    const strength = (criteriaMet / totalCriteria) * 100;

    let barColor = "red";
    if (strength >= 75) barColor = "green";
    else if (strength >= 50) barColor = "yellow";
    else if (strength >= 25) barColor = "orange";

    return {
      width: `${strength}%`,
      backgroundColor: barColor,
      height: 10, // Example height
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        secureTextEntry
        placeholder="Enter your password"
      />
      <View style={styles.strengthBarContainer}>
        <View style={getPasswordStrengthBarStyle()} />
      </View>
      <View style={styles.criteriaList}>
        <PasswordCriteria
          isValid={passwordCriteria.startWithLetter}
          text="Start with a letter"
        />
        <PasswordCriteria
          isValid={passwordCriteria.upper}
          text="One uppercase letter"
        />
        <PasswordCriteria
          isValid={passwordCriteria.lower}
          text="One lowercase letter"
        />
        <PasswordCriteria isValid={passwordCriteria.number} text="One number" />
        <PasswordCriteria
          isValid={passwordCriteria.special}
          text="One special character (!,@,#,$,%)"
        />
        <PasswordCriteria
          isValid={passwordCriteria.length}
          text="At least 8 characters"
        />
      </View>
    </View>
  );
};

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
