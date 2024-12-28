import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker

interface CountrySelectProps {
  onSelect: (countryCode: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("LK");

  const countries = [
    { code: "AT", name: "Austria" },
    { code: "AU", name: "Australia" },
    { code: "BD", name: "Bangladesh" },
    { code: "BE", name: "Belgium" },
    { code: "BR", name: "Brazil" },
    { code: "CA", name: "Canada" },
    { code: "CH", name: "Switzerland" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "SG", name: "Singapore" },
    { code: "US", name: "United States" },
    { code: "LK", name: "Sri Lanka" },
  ];

  const handleSelect = (value: string) => {
    setSelectedCountry(value);
    onSelect(value);
  };

  return (
    <View>
      {/* <Text style={styles.label}>Select Country</Text> */}
      <Picker
        selectedValue={selectedCountry}
        onValueChange={handleSelect}
        style={styles.picker}
      >
        {countries.map((country) => (
          <Picker.Item
            key={country.code}
            label={country.name}
            value={country.code}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    backgroundColor: "white",
    fontSize: 15,
    borderRadius: 15,
    paddingHorizontal: 5,
  },
});

export default CountrySelect;
