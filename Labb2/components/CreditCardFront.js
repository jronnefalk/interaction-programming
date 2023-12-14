import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import {
  formatCardNumber,
  formatExpiryDate,
  getCardTypeImage,
} from "../functions/utils";

const CreditCardFront = ({ number, name, cardMonth, cardYear }) => {
  const displayNumber = formatCardNumber(number) || "#### #### #### ####";

  const displayExpiry = formatExpiryDate(cardMonth, cardYear);

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={require("../assets/6.jpeg")} // Replace with the actual image path
        style={styles.cardImage}
      >
        <View style={styles.cardTop}>
          <Image
            source={require("../assets/chip.png")}
            style={styles.chipImage}
          />
          <Image
            source={getCardTypeImage(number)}
            style={styles.cardTypeImage}
          />
        </View>

        {/* Card Number */}
        <Text style={styles.cardNumber}>{displayNumber}</Text>

        {/* Card Holder and Expiration Date */}
        <View style={styles.cardBottom}>
          <View style={styles.cardHolder}>
            <Text style={styles.label}>Card Holder</Text>
            <Text style={styles.value}>
              {name.toUpperCase() || "FULL NAME"}
            </Text>
          </View>
          <View style={styles.expiry}>
            <Text style={styles.label}>Expires</Text>
            <Text style={styles.value}>{displayExpiry}</Text>
          </View>
        </View>
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
    position: "absolute",
    alignSelf: "center",
    marginBottom: 480,
    width: 350,
    height: 350 * aspectRatio,
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "space-between", // Align children vertically
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // ... additional styling as needed
  },
  chipImage: {
    // Style for chip image
    width: 50, // Adjust as necessary
    height: 40, // Adjust as necessary
    borderRadius: 8,
  },
  cardTypeImage: {
    width: 70, // You might need to adjust this
    height: 50, // You might need to adjust this
    resizeMode: "contain", // This will ensure the logo fits within the dimensions without being cut off
  },
  cardNumber: {
    fontSize: 22,
    letterSpacing: 2,
    color: "white",
    fontFamily: "Source Code Pro",
    textAlign: "center",
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHolder: {
    justifyContent: "flex-start",
    width: "70%", // Adjust this value as needed
  },
  expiry: {
    justifyContent: "flex-end",
    width: "30%", // Adjust this value as needed
  },
  label: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Source Code Pro",
  },
  value: {
    fontSize: 18,
    color: "white",
    fontFamily: "Source Code Pro",
  },
});

export default CreditCardFront;
