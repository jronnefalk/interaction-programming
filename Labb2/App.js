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
        <View style={styles.creditCardContainer}>
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
    justifyContent: "space-around", // Adjust the layout of child components
    padding: 20,
  },
  creditCardContainer: {
    position: "absolute", // Use 'absolute' if you want to position it specifically
    zIndex: 1, // Ensure card is above the form
    // Other styling for credit card container
    top: 10,
  },
  formContainer: {
    zIndex: 0, // Ensure form is below the card or vice versa
    // Other styling for form container
  },
});
