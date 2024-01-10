import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const PasswordStrengthMeter = ({
  scoreAlgorithm,
  customStrengthLevels,
  style,
  onPasswordChange,
  backgroundColor,
}) => {
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);
  const [barWidth, setBarWidth] = useState("0%");
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("lightgrey"); // Add color state

  useEffect(() => {
    setScore(scoreAlgorithm(password));
  }, [password, scoreAlgorithm]);

  useEffect(() => {
    const levels = customStrengthLevels || defaultStrengthLevels;
    const { label, color } = getLevelInfo();
    const newBarWidth = `${
      (score / levels[levels.length - 1].threshold) * 100
    }%`;

    // Update the state variables
    setBarWidth(newBarWidth);
    setLabel(label);
    setColor(color); // Update the color state

    console.log("barWidth:", newBarWidth, "label:", label, "strength:", score);
  }, [score, customStrengthLevels]);

  const handlePasswordChange = (text) => {
    setPassword(text);
    onPasswordChange && onPasswordChange(text);
  };

  const getLevelInfo = () => {
    for (let i = 0; i < levels.length; i++) {
      if (score <= levels[i].threshold) {
        return levels[i];
      }
    }
    return levels[levels.length - 1];
  };

  const levels = customStrengthLevels || defaultStrengthLevels;

  return (
    <View
      style={[styles.container, style, { backgroundColor: backgroundColor }]}
    >
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={password}
      />
      {password.length > 0 && (
        <>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: color, width: barWidth },
            ]}
          />
          <Text style={styles.label}>{label}</Text>
        </>
      )}
    </View>
  );
};

const defaultStrengthLevels = [
  { label: "Very Weak", threshold: 10, color: "red" },
  { label: "Weak", threshold: 30, color: "orange" },
  { label: "Average", threshold: 50, color: "yellow" },
  { label: "Strong", threshold: 70, color: "lightgreen" },
  { label: "Very Strong", threshold: 100, color: "green" },
];

PasswordStrengthMeter.propTypes = {
  scoreAlgorithm: PropTypes.func.isRequired,
  customStrengthLevels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      threshold: PropTypes.number,
      color: PropTypes.string,
    })
  ),
  style: PropTypes.object,
  onPasswordChange: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
};

PasswordStrengthMeter.defaultProps = {
  customStrengthLevels: defaultStrengthLevels,
  style: {},
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
    width: "100%",
    marginBottom: 30,
  },
  input: {
    height: 30,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  label: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#000",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: "stretch",
  },
});

export default PasswordStrengthMeter;
