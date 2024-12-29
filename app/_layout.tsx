import React from "react";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../hooks/auth/AuthContext";
import { StatusBar } from "react-native";

const RootLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
};

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={"black"} />
      <RootLayout />
    </AuthProvider>
  );
}
