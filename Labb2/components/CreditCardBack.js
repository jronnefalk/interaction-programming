import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { getCardTypeImage, formatCVVNumber } from "../functions/utils";

const CreditCardBack = ({ cardCvv, number, backgroundImage }) => {
  const displayCVV = "*".repeat(cardCvv.length);

  return (
    <View style={styles.cardContainer}>
      <ImageBackground source={backgroundImage} style={styles.cardImage}>
        <View style={styles.blackStrip}></View> {/* Black strip */}
        <Text style={styles.label}>CVV</Text>
        <View style={styles.cvvField}>
          <Text style={styles.cvvText}>{displayCVV}</Text>
        </View>
        <Image source={getCardTypeImage(number)} style={styles.cardTypeImage} />
      </ImageBackground>
    </View>
  );
};

const cardWidth = 85.6; // in millimeters
const cardHeight = 53.98; // in millimeters

// Calculate the aspect ratio
const aspectRatio = cardHeight / cardWidth;

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: "center",
    width: 350,
    height: 350 * aspectRatio,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  blackStrip: {
    position: "absolute",
    top: 22, // adjust according to your design
    left: 0,
    width: "100%",
    height: 40,
    backgroundColor: "black",
    opacity: 0.85,
  },
  cvvField: {
    position: "absolute",
    top: 100, // Adjust this value to position the CVV field at a fixed location
    right: 12, // Adjust this value to position the CVV field at a fixed location
    width: 320,
    height: 30,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 4,
    padding: 5, // Add padding inside the field
  },
  cvvText: {
    color: "black",
    fontSize: 20,
    textAlign: "right", // Align text to the right
    width: "100%", // Ensure the text container takes the full width of cvvField
  },
  cardTypeImage: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 60,
    height: 40,
    resizeMode: "contain",
    opacity: 0.6,
  },
  label: {
    fontSize: 12,
    color: "white",
    fontFamily: "Source Code Pro",
    position: "absolute",
    top: 80, // Adjust this value as needed to position above the CVV field
    right: 30, // Adjust this value to align to the right of the CVV field
  },
});

export default CreditCardBack;
