import React, { useState, useCallback } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import CreditCardForm from "./components/CreditCardForm";
import CreditCard from "./components/CreditCard";
import { formatCardNumber } from "./functions/utils";

export default function App() {
  // Store and manage credit card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // State for managing if the card is flipped (showing front or back)
  const [isFlipped, setIsFlipped] = useState(false);

  // State to track which field is currently focused
  const [focusField, setFocusedField] = useState(null);

  // Function to handle the flipping of the card, updates the 'isFlipped' state
  const handleFlip = useCallback((flipStatus) => {
    setIsFlipped(flipStatus);
  }, []);

  // Function to set which field is focused (highlighted)
  const handleSetFocusedField = useCallback((field) => {
    setFocusedField(field);
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        {/* Credit card display component */}
        <View style={styles.cardContainer}>
          <CreditCard
            number={formatCardNumber(cardNumber)}
            name={cardName}
            cardMonth={cardMonth}
            cardYear={cardYear}
            cardCvv={cardCvv}
            isFlipped={isFlipped}
            focusField={focusField}
            setFocusedField={handleSetFocusedField}
          />
        </View>

        {/* Credit card form component */}
        <View style={styles.formContainer}>
          <CreditCardForm
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardName={cardName}
            setCardName={setCardName}
            cardMonth={cardMonth}
            setCardMonth={setCardMonth}
            cardYear={cardYear}
            setCardYear={setCardYear}
            cardCvv={cardCvv}
            setCardCvv={setCardCvv}
            handleFlip={handleFlip}
            focusField={focusField}
            setFocusedField={handleSetFocusedField}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ddeefc",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    width: "100%",
    maxWidth: 700,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: 20,
  },
  cardContainer: {
    position: "absolute",
    top: 10,
    zIndex: 2,
  },
  formContainer: {
    position: "absolute",
    top: "40%",
    zIndex: 1,
    width: "90%",
    top: 120,
  },
});
