import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import CreditCardForm from "./components/CreditCardForm";
import CreditCardView from "./components/CreditCardView";
import { formatCardNumber } from "./functions/utils";

export default function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  return (
    <View style={styles.body}>
      <CreditCardView
        number={formatCardNumber(cardNumber)}
        name={cardName}
        cardMonth={cardMonth}
        cardYear={cardYear}
      />
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
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ddeefc",
    alignItems: "center",
    justifyContent: "center",
  },
});
