import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { formatInputCardNumber, formatCVVNumber } from "../functions/utils"; // Adjust the path as needed

const CreditCardForm = ({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  cardMonth,
  setCardMonth,
  cardYear,
  setCardYear,
  cardCvv,
  setCardCvv,
  handleFlip,
}) => {
  // Simplified months and years arrays
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear + i).toString()
  );

  const handleSubmit = () => {
    console.log("Form submitted", {
      cardNumber,
      cardName,
      cardMonth,
      cardYear,
      cardCvv,
    });
  };

  const handleCardNumberChange = (text) => {
    const cleaned = text.replace(/\D+/g, "").substring(0, 16); // Remove non-digits and limit to 16 characters
    const formattedNumberForInput = formatInputCardNumber(cleaned); // Format for the input field
    setCardNumber(formattedNumberForInput); // Update state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Number</Text>
      {/* Card number */}
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
      />

      {/* Card holder name */}
      <Text style={styles.label}>Card Holder</Text>
      <TextInput
        style={styles.input}
        value={cardName}
        onChangeText={setCardName}
      />

      <View style={styles.row}>
        {/* Container for Expiration Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Expiration Date</Text>
          <View style={styles.dateInputs}>
            <Picker
              selectedValue={cardMonth}
              style={[styles.input, styles.pickerInput]}
              onValueChange={setCardMonth}
            >
              {months.map((month) => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>

            <Picker
              selectedValue={cardYear}
              style={[styles.input, styles.pickerInput]}
              onValueChange={setCardYear}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Container for CVV */}
        <View style={styles.cvvContainer}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.cvvInput}
            value={cardCvv}
            onChangeText={(text) => setCardCvv(formatCVVNumber(text))}
            keyboardType="numeric"
            secureTextEntry
            onFocus={() => handleFlip(true)}
            onBlur={() => handleFlip(false)}
          />
        </View>
      </View>

      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 160,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Increased shadow opacity for a stronger shadow
    shadowRadius: 50,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "95%",
    maxWidth: 500,
    position: "relative", // Added for positioning the CreditCardView
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dateContainer: {
    flex: 1,
    marginRight: 5,
  },
  cvvContainer: {
    flex: 1,
    marginLeft: 5,
  },
  dateInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  pickerInput: {
    flex: 1,
    marginRight: 5,
  },
  cvvInput: {
    flex: 1,
    marginLeft: 5,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#2364d2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Increased shadow opacity for a stronger shadow
    shadowRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 16,
    color: "black",
  },
});

export default CreditCardForm;
