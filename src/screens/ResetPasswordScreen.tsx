import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL;

export default function ResetPasswordScreen(
  { route }: any
) {
  const { token } = route.params;

  const [password, setPassword] =
    useState("");

  const handleReset = async () => {
    try {
      const response = await fetch(
        `${API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data =
        await response.json();

      Alert.alert(
        "Succès",
        data.message
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de modifier le mot de passe"
      );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nouveau mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleReset}
        style={{
          backgroundColor: "#1F8B4C",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Modifier
        </Text>
      </TouchableOpacity>
    </View>
  );
}