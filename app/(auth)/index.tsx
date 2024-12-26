import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../hooks/auth/AuthContext";
import { Link, useRouter } from "expo-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const validEmail = "r@gmail.com";
  const validPassword = "123";

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (email === validEmail && password === validPassword) {
      login();
      router.push("/(tabs)");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        height: "100%",
      }}
    >
      <Image
        source={require("../../assets/images/brain.png")}
        style={styles.logo}
      />

      <Text style={{ fontSize: 28, textAlign: "center", marginTop: -16 }}>
        Welcome!
      </Text>
      <Text style={{ fontSize: 28, marginBottom: 20, textAlign: "center" }}>
        to <Text style={styles.brandName}>Mind Sphere</Text>
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
