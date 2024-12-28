import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import useFetchData from "@/hooks/useFetchList";
import { useCount } from "@/hooks/useCountIncrement";

interface GoalCardProps {
  first_name: string;
  last_name: string;

  address: string;
  city: string;
  telephone_number: string;
}

const capitalizeEachWord = (text: string): string => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const GoalCard: React.FC<GoalCardProps> = ({
  first_name,
  last_name,
  address,
  city,
  telephone_number,
}) => {
  const { countIncrement } = useCount();
  return (
    <TouchableOpacity style={styles.container} onPress={countIncrement}>
      <View style={styles.proFrame}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.proImage}
        />
      </View>
      <View style={{ display: "flex", width: "80%" }}>
        <Text style={styles.name}>
          {capitalizeEachWord(first_name)} {capitalizeEachWord(last_name)}
        </Text>
        <Text style={styles.address}>
          Address: {capitalizeEachWord(address)}
        </Text>
        <Text style={styles.address}>City: {capitalizeEachWord(city)}</Text>
        <Text style={styles.address}>Tel: {telephone_number}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    borderRadius: 15,
    backgroundColor: "white",
    gap: 15,
    marginBottom: 15,
  },
  proFrame: {
    width: 50,
    height: 50,
    borderRadius: 150,
    overflow: "hidden",
  },

  proImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    color: "#010f24",
  },

  address: {
    fontSize: 14,
    opacity: 0.7,
    color: "#010f24",
  },
});

export default GoalCard;
