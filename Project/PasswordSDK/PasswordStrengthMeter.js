import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const PasswordStrengthMeter = ({ password, score, customStrengthLevels }) => {
  const defaultStrengthLevels = [
    { label: "Very Weak", threshold: 10, color: "red" },
    { label: "Weak", threshold: 30, color: "orange" },
    { label: "Average", threshold: 50, color: "yellow" },
    { label: "Strong", threshold: 70, color: "lightgreen" },
    { label: "Very Strong", threshold: 90, color: "green" },
  ];

  const levels = customStrengthLevels || defaultStrengthLevels;
  const maxThreshold = levels[levels.length - 1].threshold;

  const getLevelInfo = () => {
    for (let i = 0; i < levels.length; i++) {
      if (score <= levels[i].threshold) {
        return levels[i];
      }
    }
    return levels[levels.length - 1];
  };

  const { label, color } = getLevelInfo();
  const barWidth = `${(score / maxThreshold) * 100}%`;

  useEffect(() => {
    // This useEffect will be triggered whenever the score changes
    console.log(`Score: ${score}, Label: ${label}, Bar Width: ${barWidth}`);
  }, [score, label, barWidth]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.strengthBar,
          { width: barWidth, backgroundColor: color },
        ]}
      />
      {password && password.length > 0 && (
        <Text style={[styles.label, { color: "black" }]}>{label}</Text>
      )}

      {/* Display labels for custom or default levels */}
      <View style={styles.labelsContainer}>
        {levels.map((level, index) => (
          <Text
            key={index}
            style={[
              styles.levelLabel,
              {
                color: "black",
                fontWeight: label === level.label ? "bold" : "normal",
              },
            ]}
          ></Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  strengthBar: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  label: {
    marginTop: 5,
    fontWeight: "bold",
    color: "black",
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  levelLabel: {
    flex: 1,
    textAlign: "center",
    color: "black",
  },
});

export default PasswordStrengthMeter;
