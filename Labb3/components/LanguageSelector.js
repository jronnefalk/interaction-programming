import React from "react";
import { Picker } from "@react-native-picker/picker";

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => onLanguageChange(itemValue)}
    >
      <Picker.Item label="JavaScript" value="JavaScript" />
      <Picker.Item label="TypeScript" value="TypeScript" />
      <Picker.Item label="Go" value="Go" />
      <Picker.Item label="Rust" value="Rust" />
      <Picker.Item label="Swift" value="Swift" />
      <Picker.Item label="Web" value="Web" />
      <Picker.Item label="PHP" value="PHP" />
      <Picker.Item label="CSS" value="CSS" />
      <Picker.Item label="C" value="C" />
      <Picker.Item label="C#" value="C#" />
      <Picker.Item label="C++" value="C++" />
      <Picker.Item label="Python" value="Pythonv" />
      <Picker.Item label="Ruby" value="Ruby" />
      <Picker.Item label="Java" value="Java" />
    </Picker>
  );
};

export default LanguageSelector;
