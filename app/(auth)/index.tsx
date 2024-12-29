import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useAuth } from "../../hooks/auth/AuthContext";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("users");
      const usersArray = existingData ? JSON.parse(existingData) : [];

      const user = usersArray.find((u: any) => u.email === email);

      if (!user) {
        setError("Email not registered.");
        return;
      }

      if (user.password !== password) {
        setError("Incorrect password.");
        return;
      }

      setError("");
      login();

      router.push({
        pathname: "/(tabs)",
        params: { name: user.name, email: user.email },
      });
    } catch (err) {
      console.error("Failed to validate user", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        height: "100%",
      }}
    >
      <StatusBar />
      <Image
        source={require("../../assets/images/brain.png")}
        style={styles.logo}
      />

      <Text style={{ fontSize: 28, textAlign: "center", marginTop: -16 }}>
        Welcome!
      </Text>
      <Text style={{ fontSize: 28, marginBottom: 20, textAlign: "center" }}>
        to <Text style={styles.brandName}>Health Locator</Text>
      </Text>
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

      {error ? (
        <Text style={{ color: "red", marginBottom: 8, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
        <Text style={styles.loginBtnText}>Sign In</Text>
      </TouchableOpacity>

      <Link
        href="/(auth)/signup"
        style={{
          position: "absolute",
          textAlign: "center",
          bottom: 15,
          left: 0,
          right: 0,
        }}
      >
        <Text>Don't have an account?</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    width: 250,
    height: 250,
  },

  brandName: {
    color: "green",
    fontWeight: 500,
  },

  inputField: {
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },

  loginBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 12,
    width: "60%",
    borderRadius: 10,
    alignSelf: "center",
  },

  loginBtnText: {
    color: "white",
    fontSize: 18,
  },
});

export default SignIn;
