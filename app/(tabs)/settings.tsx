import { useAuth } from "@/hooks/auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface UserType {
  name: string;
  email: string;
}

export default function TabTwoScreen() {
  const { logout } = useAuth();
  const { email } = useLocalSearchParams();

  const [user, setUser] = useState<UserType | null>(null);

  const fetchUserData = async () => {
    try {
      const existingData = await AsyncStorage.getItem("users");
      const usersArray = existingData ? JSON.parse(existingData) : [];

      const fetchedUser = usersArray.find((u: any) => u.email === email);
      setUser(fetchedUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Info</Text>

      {user && (
        <View style={styles.info}>
          <Text style={styles.bodyText}>
            Name:
            <Text style={{ fontWeight: 500 }}> {user.name}</Text>
          </Text>

          <Text style={styles.bodyText}>
            Email:
            <Text style={{ fontWeight: 500 }}> {user.email}</Text>
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#912651",
    borderRadius: 15,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  bodyText: {
    fontSize: 16,
  },

  info: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
});
