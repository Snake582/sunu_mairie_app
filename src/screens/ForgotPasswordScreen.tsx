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

export default function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Erreur", "Veuillez saisir votre adresse email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message) ? data.message.join("\n") : data.message
        );
      }

      Alert.alert(
        "Code envoyé",
        data.message || "Vérifiez votre boîte mail pour le code de réinitialisation.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("ResetPassword", { email, token: data.token }),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Impossible d'envoyer l'email.");
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
            <Text style={styles.title}>Mot de passe oublié ?</Text>
            <Text style={styles.subtitle}>
              Entrez votre email et recevez un code de réinitialisation.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Adresse email</Text>
            <TextInput
              placeholder="john@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              activeOpacity={0.85}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Recevoir mon code</Text>
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
    fontSize: 30,
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
    maxWidth: 280,
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
