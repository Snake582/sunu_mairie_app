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
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen({ navigation }: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [adresse, setAdresse] = useState("");
  const [photo, setPhoto] = useState("");
  const [numeroCni, setNumeroCni] = useState("");

const handleRegister = async () => {
  try {
    if (
      !fullName ||
      !email ||
      !phone ||
      !password
    ) {
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs obligatoires"
      );
      return;
    }

    let imageUrl = "";

    // Upload photo si sélectionnée
    if (photo) {
      const uploadResult = await uploadImage();
      imageUrl = uploadResult.imageUrl;
    }

    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const response = await fetch(
      `{API_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          password,
          adresse,
          numeroCni,
          photo: imageUrl,
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

    Alert.alert(
      "Succès",
      "Compte créé avec succès"
    );

    navigation.navigate("Login");
  } catch (error: any) {
    Alert.alert(
      "Erreur",
      error.message ||
        "Une erreur est survenue"
    );
  }
};

const uploadImage = async () => {
  const formData = new FormData();

  formData.append(
    "photo",
    {
      uri: photo,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any
  );

  const response = await fetch(
    "http://192.168.1.9:3000/users/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      "Erreur lors de l'upload de la photo"
    );
  }

  return await response.json();
};

const pickImage = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Permission refusée",
      "Veuillez autoriser l'accès à la galerie"
    );
    return;
  }

  const result =
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

  if (!result.canceled) {
    setPhoto(result.assets[0].uri);
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
              value={fullName}
              onChangeText={setFullName}
            />

           <Text style={styles.label}>Adresse email</Text>
             <TextInput
               placeholder="exemple@email.com"
               keyboardType="email-address"
               placeholderTextColor="#94A3B8"
               style={styles.input}
               value={email}
               onChangeText={setEmail}
             />

             <Text style={styles.label}>Numéro de téléphone</Text>
             <TextInput
               placeholder="77 000 00 00"
               keyboardType="phone-pad"
               placeholderTextColor="#94A3B8"
               style={styles.input}
               value={phone}
               onChangeText={setPhone}
             />

             <Text style={styles.label}>Mot de passe</Text>
             <TextInput
               placeholder="mot de passe"
               secureTextEntry
               placeholderTextColor="#94A3B8"
               style={styles.input}
               value={password}
               onChangeText={setPassword}
             />

             <Text style={styles.label}>Adresse</Text>
              <TextInput
                placeholder="Votre adresse"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={adresse}
                onChangeText={setAdresse}
              />

              <Text style={styles.label}>Numéro CNI</Text>
              <TextInput
                placeholder="1234567890123"
                keyboardType="numeric"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                value={numeroCni}
                onChangeText={setNumeroCni}
              />

              <TouchableOpacity onPress={pickImage}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0E693D",
                    marginBottom: 10,
                    fontWeight: "600",
                  }}
                >
                  Choisir une photo
                </Text>
              </TouchableOpacity>

              {photo && (
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    alignSelf: "center",
                    marginBottom: 15,
                  }}
                />
              )}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
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