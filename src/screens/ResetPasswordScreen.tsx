import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ResetPasswordScreen({
  route,
  navigation,
}: any) {
  const { email, token } = route.params || {};

  const [code, setCode] = useState(token ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!code || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/reset-password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message) ? data.message.join("\n") : data.message
        );
      }

      Alert.alert(
        "Succès",
        data.message || "Votre mot de passe a été réinitialisé.",
        [
          {
            text: "Se connecter",
            onPress: () => navigation.replace("Login"),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Erreur",
        error.message || "Impossible de réinitialiser le mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../../assets/logo-removebg-preview.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.header}>
            <Text style={styles.title}>Réinitialiser le mot de passe</Text>
            <Text style={styles.subtitle}>
              Entrez le code reçu et définissez votre nouveau mot de passe.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Code OTP</Text>
            <TextInput
              placeholder="123456"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />

            <Text style={styles.label}>Nouveau mot de passe</Text>
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleReset}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>
                  Réinitialiser le mot de passe
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.backText}>Retour à la connexion</Text>
          </Pressable>
        </ScrollView>
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
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logo: {
    width: 220,
    height: 140,
    alignSelf: "center",
    marginBottom: 20,
  },

  header: {
    marginBottom: 30,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
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
    marginBottom: 20,
    fontSize: 15,
    color: "#1E293B",
  },

  button: {
    backgroundColor: "#0E693D",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#0E693D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },

  backText: {
    marginTop: 24,
    textAlign: "center",
    color: "#0E693D",
    fontWeight: "600",
    fontSize: 15,
  },
});
