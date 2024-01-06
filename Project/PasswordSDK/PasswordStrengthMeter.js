import React, { useState, useMemo } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const PasswordCriteria = ({ isValid, text }) => (
  <Text style={[styles.criteria, isValid ? styles.valid : styles.invalid]}>
    {isValid ? "✓" : "✗"} {text}
  </Text>
);

const defaultStrengthAlgorithm = (password, criteria) => {
  let strength = 0;
  Object.values(criteria).forEach((isValid) => {
    if (isValid) strength += 20;
  });
  return strength; // Returns a strength score between 0 and 100
};

const PasswordStrengthMeter = ({
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
  const [password, setPassword] = useState("");

  const passwordCriteria = useMemo(
    () => ({
      length: password.length >= minLength && password.length <= maxLength,
      upper: requireUpperCase ? /[A-Z]/.test(password) : true,
      lower: requireLowerCase ? /[a-z]/.test(password) : true,
      number: requireNumbers ? /\d/.test(password) : true,
      special: requireSpecialChars
        ? new RegExp("[" + allowedSpecialChars + "]").test(password)
        : true,
    }),
    [
      password,
      minLength,
      maxLength,
      requireUpperCase,
      requireLowerCase,
      requireNumbers,
      requireSpecialChars,
      allowedSpecialChars,
    ]
  );

  const calculateStrength = useMemo(() => {
    const algorithm = customStrengthAlgorithm || defaultStrengthAlgorithm;
    return algorithm(password, passwordCriteria);
  }, [password, passwordCriteria, customStrengthAlgorithm]);

  const getPasswordStrengthBarStyle = () => {
    // calculateStrength is a value, not a function, so you use it directly
    const strength = calculateStrength; // Corrected usage

    let barColor = strengthBarColors.weak; // Default color when no password has been entered

    if (strength >= 80) barColor = strengthBarColors.veryStrong;
    else if (strength >= 60) barColor = strengthBarColors.strong;
    else if (strength >= 40) barColor = strengthBarColors.good;
    else if (strength >= 20) barColor = strengthBarColors.fair;

    return {
      width: password && strength > 0 ? `${strength}%` : "0%",
      backgroundColor: barColor,
      height: 10,
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Enter your password"
      />
      <View style={styles.strengthBarContainer}>
        <View style={getPasswordStrengthBarStyle()} />
      </View>
      <View style={styles.criteriaList}>
        {requireUpperCase && (
          <PasswordCriteria
            isValid={passwordCriteria.upper}
            text="One uppercase letter"
          />
        )}
        {requireLowerCase && (
          <PasswordCriteria
            isValid={passwordCriteria.lower}
            text="One lowercase letter"
          />
        )}
        {requireNumbers && (
          <PasswordCriteria
            isValid={passwordCriteria.number}
            text="One number"
          />
        )}
        {requireSpecialChars && (
          <PasswordCriteria
            isValid={passwordCriteria.special}
            text="One special character (!,@,#,$,%)"
          />
        )}
        <PasswordCriteria
          isValid={passwordCriteria.length}
          text={`At least ${minLength} characters`}
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
