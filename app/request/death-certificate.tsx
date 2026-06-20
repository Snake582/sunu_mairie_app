import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { IconSymbol } from "~/components/ui/IconSymbol";

export default function DeathCertificateScreen() {
  const router = useRouter();
  const [prenomDefunt, setPrenomDefunt] = useState("");
  const [nomDefunt, setNomDefunt] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [dateDeces, setDateDeces] = useState("");
  const [lieuDeces, setLieuDeces] = useState("");

  const [declarant, setDeclarant] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [copies, setCopies] = useState("1");
  const [motif, setMotif] = useState("");

  const [certificat, setCertificat] = useState<string | null>(null);
  const [pieceIdentite, setPieceIdentite] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (
      !prenomDefunt ||
      !nomDefunt ||
      !dateNaissance ||
      !dateDeces ||
      !lieuDeces ||
      !declarant ||
      !telephone ||
      !adresse ||
      !copies ||
      !motif
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
          type: "deces",
          data: {
            prenomDefunt,
            nomDefunt,
            dateNaissance,
            dateDeces,
            lieuDeces,
            declarant,
            telephone,
            adresse,
            copies,
            motif,
          },
        }),
      });

      const data = await response.json();

      console.log("REQUEST RESPONSE :", data);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message) ? data.message.join(", ") : data.message
        );
      }

      Alert.alert("Succès", "Signalement envoyé avec succès.", [
        {
          text: "OK",
          onPress: () => router.navigate("/demandes"),
        },
      ]);

      setPrenomDefunt("");
      setNomDefunt("");
      setDateNaissance("");
      setDateDeces("");
      setLieuDeces("");
      setDeclarant("");
      setTelephone("");
      setAdresse("");
      setCopies("");
      setMotif("");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Erreur", error.message);
    }
  };

  const pickImage = async (type: "certificat" | "piece") => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "Veuillez autoriser l'accès à la galerie."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (!result.canceled) {
      if (type === "certificat") {
        setCertificat(result.assets[0].uri);
      } else {
        setPieceIdentite(result.assets[0].uri);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0E693D" />

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Acte de décès</Text>

          <Text style={styles.headerSubtitle}>
            Déclarez un décès et demandez un extrait officiel.
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* INFO */}
          <View style={styles.infoCard}>
            <IconSymbol name="info" size={22} color="#0E693D" />

            <Text style={styles.infoText}>
              Assurez-vous que les informations saisies correspondent aux
              documents officiels.
            </Text>
          </View>

          {/* DEFUNT */}
          <Text style={styles.sectionTitle}>Informations du défunt</Text>

          <TextInput
            placeholder="Prénom"
            style={styles.input}
            value={prenomDefunt}
            onChangeText={setPrenomDefunt}
          />

          <TextInput
            placeholder="Nom"
            style={styles.input}
            value={nomDefunt}
            onChangeText={setNomDefunt}
          />

          <TextInput
            placeholder="Date de naissance"
            style={styles.input}
            value={dateNaissance}
            onChangeText={setDateNaissance}
          />

          <TextInput
            placeholder="Date de décès"
            style={styles.input}
            value={dateDeces}
            onChangeText={setDateDeces}
          />

          <TextInput
            placeholder="Lieu du décès"
            style={styles.input}
            value={lieuDeces}
            onChangeText={setLieuDeces}
          />

          {/* DECLARANT */}
          <Text style={styles.sectionTitle}>Informations du déclarant</Text>

          <TextInput
            placeholder="Nom complet"
            style={styles.input}
            value={declarant}
            onChangeText={setDeclarant}
          />

          <TextInput
            placeholder="Téléphone"
            keyboardType="phone-pad"
            style={styles.input}
            value={telephone}
            onChangeText={setTelephone}
          />

          <TextInput
            placeholder="Adresse"
            style={styles.input}
            value={adresse}
            onChangeText={setAdresse}
          />

          <TextInput
            placeholder="Nombre de copies"
            keyboardType="numeric"
            style={styles.input}
            value={copies}
            onChangeText={setCopies}
          />

          {/* CERTIFICAT */}
          <Text style={styles.sectionTitle}>Certificat médical de décès</Text>

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => pickImage("certificat")}
          >
            {certificat ? (
              <Image source={{ uri: certificat }} style={styles.preview} />
            ) : (
              <>
                <IconSymbol name="upload-file" size={45} color="#0E693D" />
                <Text style={styles.uploadText}>Ajouter le certificat</Text>
              </>
            )}
          </TouchableOpacity>

          {/* PIECE IDENTITE */}
          <Text style={styles.sectionTitle}>Pièce d'identité du déclarant</Text>

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={() => pickImage("piece")}
          >
            {pieceIdentite ? (
              <Image source={{ uri: pieceIdentite }} style={styles.preview} />
            ) : (
              <>
                <IconSymbol name="badge" size={45} color="#0E693D" />
                <Text style={styles.uploadText}>
                  Ajouter la pièce d'identité
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* MOTIF */}
          <Text style={styles.sectionTitle}>Motif de la demande</Text>

          <TextInput
            placeholder="Précisez le motif..."
            multiline
            textAlignVertical="top"
            style={styles.textArea}
            value={motif}
            onChangeText={setMotif}
          />

          {/* BOUTON */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <IconSymbol name="send" size={22} color="#FFF" />

            <Text style={styles.buttonText}>Envoyer la demande</Text>
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
  },

  content: {
    padding: 20,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    padding: 15,
    borderRadius: 16,
    marginBottom: 25,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    color: "#065F46",
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#FFF",
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 15,
    elevation: 2,
  },

  uploadBox: {
    height: 180,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#0E693D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  uploadText: {
    marginTop: 10,
    fontWeight: "600",
    color: "#334155",
  },

  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  textArea: {
    backgroundColor: "#FFF",
    height: 120,
    borderRadius: 14,
    padding: 15,
    marginBottom: 25,
    elevation: 2,
  },

  button: {
    backgroundColor: "#0E693D",
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
