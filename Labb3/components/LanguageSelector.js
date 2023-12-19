import React from "react";
import { Picker } from "@react-native-picker/picker";

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => onLanguageChange(itemValue)}
    >
      {/* Map your languages to Picker.Item components */}
      <Picker.Item label="JavaScript" value="JavaScript" />
      {/* Add other languages here */}
    </Picker>
  );
};

export default LanguageSelector;
