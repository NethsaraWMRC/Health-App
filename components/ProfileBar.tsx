import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ProfileBar = () => {
  const { name } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <View style={styles.proFrame}>
          <Image
            source={require("../assets/images/avatar.jpg")}
            style={styles.proImage}
          />
        </View>

        <View style={{ display: "flex" }}>
          <Text style={styles.greetingTxt}>Hi,</Text>
          <Text style={styles.username}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  leftSide: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  proFrame: {
    width: 50,
    height: 50,
    borderRadius: 150,
    borderColor: "gray",
    borderWidth: 1,
    overflow: "hidden",
  },

  proImage: {
    width: "100%",
    height: "100%",
  },

  greetingTxt: {
    fontSize: 20,
    fontWeight: 600,
  },

  username: {
    fontSize: 16,
    opacity: 0.7,
  },
});
export default ProfileBar;
