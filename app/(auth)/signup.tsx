import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const saveDataToAsyncStorage = async () => {
    try {
      const userData = {
        name,
        email,
        password,
      };

      const existingData = await AsyncStorage.getItem("users");
      const usersArray = existingData ? JSON.parse(existingData) : [];

      const user = usersArray.find((u: any) => u.email === email);

      if (user) {
        return false;
      }

      usersArray.push(userData);

      await AsyncStorage.setItem("users", JSON.stringify(usersArray));

      Alert.alert("Success", "User registered successfully!");
      return true;
    } catch (err) {
      Alert.alert("Error", "Failed to save user data.");
    }
  };

  // Handle signup logic
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await saveDataToAsyncStorage();
    if (!res) {
      setError("Email is already registered.");
      return;
    }

    setError("");

    router.push("/(auth)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Here you can sign of for the Health Locator
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.inputField}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.inputField}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.signUpBtn} onPress={handleSignup}>
        <Text style={styles.signUpBtnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    // textAlign: "center",
    // fontWeight: "bold",
    marginBottom: 16,
  },
  inputField: {
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },

  signUpBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 12,
    width: "60%",
    borderRadius: 10,
    alignSelf: "center",
  },

  signUpBtnText: {
    color: "white",
    fontSize: 18,
  },
});

export default Signup;
