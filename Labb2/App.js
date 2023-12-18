import React, { useState, useCallback } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import CreditCardForm from "./components/CreditCardForm";
import CreditCard from "./components/CreditCard";
import { formatCardNumber } from "./functions/utils";
import CreditCardContext from "./components/CreditCardContext";

export default function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false); // Define state for flipping
  const [focusField, setFocusedField] = useState(null);

  const handleSetFocusedField = useCallback((focusField) => {
    setFocusedField(focusField);
  }, []);

  // Function to handle flipping of the card
  const handleFlip = (flipStatus) => {
    setIsFlipped(flipStatus);
  };

  return (
    <CreditCardContext.Provider
      value={{ setFocusedField: handleSetFocusedField }}
    >
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <CreditCard
              number={formatCardNumber(cardNumber)}
              name={cardName}
              cardMonth={cardMonth}
              cardYear={cardYear}
              cardCvv={cardCvv}
              isFlipped={isFlipped} // Pass the isFlipped state
              focusField={focusField}
            />{" "}
          </View>

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
              handleFlip={handleFlip} // Pass setIsFlipped to control the flip
              focusField={focusField}
              setFocusedField={handleSetFocusedField}
            />{" "}
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </CreditCardContext.Provider>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ddeefc",
    alignItems: "center",
    justifyContent: "flex-start", // Adjust the layout of child components
  },
  container: {
    width: "100%",
    maxWidth: 700,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Added to position children absolutely within this container
    top: 20,
  },
  cardContainer: {
    position: "absolute",
    top: 10, // Adjust this value to control vertical overlap
    zIndex: 2, // Card on top
  },
  formContainer: {
    position: "absolute",
    top: "40%", // Adjust this value to control vertical overlap
    zIndex: 1, // Form below card
    width: "90%",
    top: 120,
  },
});
