import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActeNaissanceScreen({ navigation }: any) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [lieuNaissance, setLieuNaissance] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nomPere, setNomPere] = useState("");
  const [nomMere, setNomMere] = useState("");
  const [copies, setCopies] = useState("");
  const [motif, setMotif] = useState("");

  const handleSubmit = async () => {
    if (
      !prenom ||
      !nom ||
      !dateNaissance ||
      !lieuNaissance ||
      !telephone
    ) {
      Alert.alert(
        "Champs obligatoires",
        "Veuillez remplir tous les champs requis."
      );
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "naissance",
          data: {
            prenom,
            nom,
            dateNaissance,
            lieuNaissance,
            telephone,
            nomPere,
            nomMere,
            copies,
            motif,
          },
        }),
      });

      const data = await response.json();

console.log("REQUEST RESPONSE :", data);

if (!response.ok) {
  throw new Error(
    data.message || "Erreur inconnue"
  );
}

      Alert.alert(
        "Demande enregistrée",
        "Votre demande d'acte de naissance a été envoyée avec succès.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Main", { screen: "Demandes" }),
          },
        ]
      );
    } catch (error: any) {
  console.log(error);

  Alert.alert(
    "Erreur",
    error.message
  );
}
  };

  return (
      <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={
      Platform.OS === "ios"
        ? "padding"
        : "height"
    }
  >
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0E693D"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Acte de naissance
        </Text>

        <Text style={styles.headerSubtitle}>
          Remplissez les informations ci-dessous pour
          effectuer votre demande.
        </Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* INFO */}
        <View style={styles.infoCard}>
          <MaterialIcons
            name="info"
            size={22}
            color="#0E693D"
          />

          <Text style={styles.infoText}>
            Vérifiez soigneusement vos informations avant
            de soumettre votre demande.
          </Text>
        </View>

        {/* FORMULAIRE */}

        <Text style={styles.label}>Prénom *</Text>
        <TextInput
          placeholder="Votre prénom"
          style={styles.input}
          value={prenom}
          onChangeText={setPrenom}
        />

        <Text style={styles.label}>Nom *</Text>
        <TextInput
          placeholder="Votre nom"
          style={styles.input}
          value={nom}
          onChangeText={setNom}
        />

        <Text style={styles.label}>Date de naissance *</Text>
        <TextInput
          placeholder="JJ/MM/AAAA"
          style={styles.input}
          value={dateNaissance}
          onChangeText={setDateNaissance}
        />

        <Text style={styles.label}>Lieu de naissance *</Text>
        <TextInput
          placeholder="Ville ou commune"
          style={styles.input}
          value={lieuNaissance}
          onChangeText={setLieuNaissance}
        />

        <Text style={styles.label}>Téléphone *</Text>
        <TextInput
          placeholder="+221 XX XXX XX XX"
          keyboardType="phone-pad"
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
        />

        <Text style={styles.label}>Nom du père</Text>
        <TextInput
          placeholder="Nom complet du père"
          style={styles.input}
          value={nomPere}
          onChangeText={setNomPere}
        />

        <Text style={styles.label}>Nom de la mère</Text>
        <TextInput
          placeholder="Nom complet de la mère"
          style={styles.input}
          value={nomMere}
          onChangeText={setNomMere}
        />

        <Text style={styles.label}>Nombre de copies</Text>
        <TextInput
          placeholder="1"
          keyboardType="numeric"
          style={styles.input}
          value={copies}
          onChangeText={setCopies}
        />

        <Text style={styles.label}>Motif de la demande</Text>
        <TextInput
          placeholder="Précisez le motif de votre demande..."
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          style={styles.textArea}
          value={motif}
          onChangeText={setMotif}
        />

        {/* BOUTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <MaterialIcons
            name="send"
            size={20}
            color="#FFF"
          />

          <Text style={styles.buttonText}>
            Envoyer la demande
          </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    backgroundColor: "#0E693D",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 22,
  },

  content: {
    padding: 20,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    color: "#065F46",
    lineHeight: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFF",
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  textArea: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    height: 130,
    marginBottom: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 2,
  },

  button: {
    backgroundColor: "#0E693D",
    height: 58,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#0E693D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 4,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});