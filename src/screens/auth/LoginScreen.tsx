import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert(
      "Erreur",
      "Veuillez remplir tous les champs"
    );
    return;
  }

  try {
    const response = await fetch(
      "http://192.168.1.8:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        Array.isArray(data.message)
          ? data.message.join("\n")
          : data.message
      );
    }

    await AsyncStorage.setItem(
      "token",
      data.access_token
    );

    Alert.alert(
      "Succès",
      "Connexion réussie"
    );

    navigation.replace("Main");
  } catch (error: any) {
    Alert.alert(
      "Erreur",
      error.message || "Connexion impossible"
    );
  }
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Logo */}
        <Image
          source={require("../../../assets/logo-removebg-preview.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenue 👋</Text>
          <Text style={styles.subtitle}>
            Connectez-vous pour accéder aux services municipaux
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.label}>Adresse email</Text>
          <TextInput
            placeholder="exemple@email.com"
            keyboardType="email-address"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            placeholder="••••••••"
            secureTextEntry
            placeholderTextColor="#999"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>

        {/* Register */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Vous n'avez pas de compte ?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerText}>
              Créer un compte
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    width: 220,
    height: 140,
    alignSelf: "center",
    marginBottom: 20,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },

  input: {
    height: 55,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
  },

  forgotPassword: {
    color: "#0E693D",
    textAlign: "right",
    marginBottom: 24,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#0E693D",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0E693D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },

  footerText: {
    color: "#64748B",
  },

  registerText: {
    color: "#0E693D",
    fontWeight: "700",
    marginLeft: 5,
  },
});