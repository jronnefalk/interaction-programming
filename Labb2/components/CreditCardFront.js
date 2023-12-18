import { React, useContext } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import {
  formatCardNumber,
  formatExpiryDate,
  getCardTypeImage,
} from "../functions/utils";
import CreditCardContext from "./CreditCardContext";

const CreditCardFront = ({
  number,
  name,
  cardMonth,
  cardYear,
  focusField,
  expiry,
  backgroundImage,
}) => {
  const displayNumber = formatCardNumber(number) || "#### #### #### ####";
  const { setFocusedField } = useContext(CreditCardContext);
  const displayExpiry = formatExpiryDate(cardMonth, cardYear);

  return (
    <View style={styles.cardContainer}>
      <ImageBackground source={backgroundImage} style={styles.cardImage}>
        <View style={styles.darkOverlay} />
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
        <Text
          style={[
            styles.cardNumber,
            focusField === "number" ? styles.highlighted : {},
          ]}
          onPress={() => setFocusedField("number")}
        >
          {displayNumber}
        </Text>

        {/* Card Holder and Expiration Date */}
        <View style={styles.cardBottom}>
          <View style={styles.cardHolder}>
            <Text style={styles.label}>Card Holder</Text>
            <Text
              style={[
                styles.value,
                focusField === "name" ? styles.highlighted : {},
              ]}
              onPress={() => setFocusedField("name")}
            >
              {name.toUpperCase() || "FULL NAME"}
            </Text>
          </View>
          <View style={styles.expiry}>
            <Text style={styles.label}>Expires</Text>
            <Text
              style={[
                styles.value,
                focusField === "expiry" ? styles.highlighted : {},
              ]}
              onPress={() => setFocusedField("expiry")}
            >
              {displayExpiry}
            </Text>
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
    padding: 20,
    justifyContent: "space-between", // Align children vertically
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust the opacity as needed
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
