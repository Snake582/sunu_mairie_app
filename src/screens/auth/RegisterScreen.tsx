import React from "react";
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
  ScrollView,
} from "react-native";

export default function RegisterScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../../../assets/logo-removebg-preview.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.header}>
            <Text style={styles.title}>Créer un compte</Text>

            <Text style={styles.subtitle}>
              Rejoignez Sunu Mairie et accédez aux services municipaux en ligne.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              placeholder="Votre nom complet"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            <Text style={styles.label}>Adresse email</Text>
            <TextInput
              placeholder="exemple@email.com"
              keyboardType="email-address"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              placeholder="77 000 00 00"
              keyboardType="phone-pad"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <TextInput
              placeholder="••••••••"
              secureTextEntry
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                Créer mon compte
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Vous avez déjà un compte ?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 24,
    paddingVertical: 30,
  },

  logo: {
    width: 220,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
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
    shadowOpacity: 0.08,
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
    color: "#1E293B",
  },

  button: {
    marginTop: 10,
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
    shadowOpacity: 0.25,
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
    marginTop: 25,
    marginBottom: 20,
  },

  footerText: {
    color: "#64748B",
  },

  loginText: {
    color: "#0E693D",
    fontWeight: "700",
    marginLeft: 5,
  },
});