import { React, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { formatInputCardNumber, formatCVVNumber } from "../functions/utils";

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
  focusField,
}) => {
  // Array of months for expiration date picker
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

  // Generate array of years for the expiration date picker
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear + i).toString()
  );

  // Refs to manage focus for different input fields
  const numberInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const monthPickerRef = useRef(null);

  // Use effect to handle focus/highlight when focusField changes
  useEffect(() => {
    if (focusField === "number") {
      numberInputRef.current?.focus();
    } else if (focusField === "name") {
      nameInputRef.current?.focus();
    } else if (focusField === "expiry") {
      monthPickerRef.current?.focus();
    }
  }, [focusField]);

  // Form submission
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
    const cleaned = text.replace(/\D+/g, "").substring(0, 16);
    const formattedNumberForInput = formatInputCardNumber(cleaned);
    setCardNumber(formattedNumberForInput);
  };

  // Use formatCVVNumber from utils to handle CVV input changes
  const handleCvvChange = (text) => {
    const sanitizedCvv = formatCVVNumber(text);
    setCardCvv(sanitizedCvv);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Number</Text>
      {/* Card number */}
      <TextInput
        ref={numberInputRef}
        style={styles.input}
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        keyboardType="numeric"
      />

      {/* Card holder name */}
      <Text style={styles.label}>Card Holder</Text>
      <TextInput
        ref={nameInputRef}
        style={styles.input}
        value={cardName}
        onChangeText={setCardName}
      />

      <View style={styles.row}>
        <View style={[styles.dateContainer]}>
          <Text style={styles.label}>Expiration Date</Text>
          <View style={styles.dateInputs}>
            <Picker
              ref={monthPickerRef}
              selectedValue={cardMonth}
              style={[styles.input, styles.pickerInput]}
              onValueChange={setCardMonth}
            >
              <Picker.Item label="Month" value="" />
              {months.map((month) => (
                <Picker.Item key={month} label={month} value={month} />
              ))}
            </Picker>

            <Picker
              selectedValue={cardYear}
              style={[styles.input, styles.pickerInput]}
              onValueChange={setCardYear}
            >
              <Picker.Item label="Year" value="" />
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
            onChangeText={handleCvvChange}
            keyboardType="numeric"
            secureTextEntry={false}
            maxLength={4}
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
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    maxWidth: 500,
  },
  input: {
    height: 40,
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
    height: 40,
  },
  cvvInput: {
    flex: 1,
    marginLeft: 5,
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
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 14,
    color: "black",
  },
});

export default CreditCardForm;
