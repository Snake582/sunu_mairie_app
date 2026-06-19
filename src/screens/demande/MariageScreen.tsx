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
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MariageScreen({ navigation }: any) {
  const [prenomEpoux, setPrenomEpoux] = useState("");
  const [nomEpoux, setNomEpoux] = useState("");

  const [prenomEpouse, setPrenomEpouse] = useState("");
  const [nomEpouse, setNomEpouse] = useState("");

  const [dateMariage, setDateMariage] = useState("");
  const [lieuMariage, setLieuMariage] = useState("");

  const [telephone, setTelephone] = useState("");
  const [copies, setCopies] = useState("1");
  const [motif, setMotif] = useState("");

  const [acteMariage, setActeMariage] = useState<string | null>(null);
  const [pieceIdentite, setPieceIdentite] = useState<string | null>(null);

  const pickImage = async (
    type: "acte" | "piece"
  ) => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "Veuillez autoriser l'accès à la galerie."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.8,
      });

    if (!result.canceled) {
      if (type === "acte") {
        setActeMariage(result.assets[0].uri);
      } else {
        setPieceIdentite(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    if (
      !prenomEpoux ||
      !nomEpoux ||
      !prenomEpouse ||
      !nomEpouse ||
      !dateMariage ||
      !lieuMariage ||
      !telephone ||
      !acteMariage ||
      !pieceIdentite ||
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
      const response = await fetch(
        `${API_URL}/requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: "mariage",
            data: {
              prenomEpoux,
              nomEpoux,
              prenomEpouse,
              nomEpouse,
              dateMariage,
              lieuMariage,
              acteMariage,
              pieceIdentite,
              telephone,
              copies,
              motif,
            },
          }),
        }
      );

      const data = await response.json();

      console.log("REQUEST RESPONSE :", data);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(", ")
            : data.message
        );
      }

      setPrenomEpoux("");
      setNomEpoux("");
      setPrenomEpouse("");
      setNomEpouse("");
      setDateMariage("");
      setLieuMariage("");
      setActeMariage(null);
      setTelephone("");
      setCopies("");
      setMotif("");

      Alert.alert(
        "Demande enregistrée",
        "Votre demande de certificat de mariage a été envoyée avec succès.",
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
        }>
        <View style={styles.container}>
      <StatusBar
        backgroundColor="#0E693D"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Certificat de mariage
        </Text>

        <Text style={styles.headerSubtitle}>
          Demandez un extrait ou une copie de votre certificat de mariage.
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoCard}>
          <MaterialIcons
            name="info"
            size={22}
            color="#0E693D"
          />

          <Text style={styles.infoText}>
            Vérifiez attentivement les informations avant de soumettre votre demande.
          </Text>
        </View>

        {/* ÉPOUX */}

        <Text style={styles.sectionTitle}>
          Informations de l'époux
        </Text>

        <TextInput
          placeholder="Prénom"
          style={styles.input}
          value={prenomEpoux}
          onChangeText={setPrenomEpoux}
        />

        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={nomEpoux}
          onChangeText={setNomEpoux}
        />

        {/* ÉPOUSE */}

        <Text style={styles.sectionTitle}>
          Informations de l'épouse
        </Text>

        <TextInput
          placeholder="Prénom"
          style={styles.input}
          value={prenomEpouse}
          onChangeText={setPrenomEpouse}
        />

        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={nomEpouse}
          onChangeText={setNomEpouse}
        />

        {/* MARIAGE */}

        <Text style={styles.sectionTitle}>
          Informations du mariage
        </Text>

        <TextInput
          placeholder="Date du mariage"
          style={styles.input}
          value={dateMariage}
          onChangeText={setDateMariage}
        />

        <TextInput
          placeholder="Lieu du mariage"
          style={styles.input}
          value={lieuMariage}
          onChangeText={setLieuMariage}
        />

        <TextInput
          placeholder="Téléphone"
          keyboardType="phone-pad"
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
        />

        <TextInput
          placeholder="Nombre de copies"
          keyboardType="numeric"
          style={styles.input}
          value={copies}
          onChangeText={setCopies}
        />

        {/* ACTE */}

        <Text style={styles.sectionTitle}>
          Acte ou livret de mariage
        </Text>

        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage("acte")}
        >
          {acteMariage ? (
            <Image
              source={{ uri: acteMariage }}
              style={styles.preview}
            />
          ) : (
            <>
              <MaterialIcons
                name="upload-file"
                size={45}
                color="#0E693D"
              />

              <Text style={styles.uploadText}>
                Ajouter le document
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* PIÈCE */}

        <Text style={styles.sectionTitle}>
          Pièce d'identité du demandeur
        </Text>

        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage("piece")}
        >
          {pieceIdentite ? (
            <Image
              source={{ uri: pieceIdentite }}
              style={styles.preview}
            />
          ) : (
            <>
              <MaterialIcons
                name="badge"
                size={45}
                color="#0E693D"
              />

              <Text style={styles.uploadText}>
                Ajouter la pièce d'identité
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* MOTIF */}

        <Text style={styles.sectionTitle}>
          Motif de la demande
        </Text>

        <TextInput
          placeholder="Précisez le motif..."
          multiline
          textAlignVertical="top"
          style={styles.textArea}
          value={motif}
          onChangeText={setMotif}
        />

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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

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
    color: "#334155",
    fontWeight: "600",
  },

  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  textArea: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 15,
    height: 120,
    marginBottom: 25,
    elevation: 2,
  },

  button: {
    backgroundColor: "#0E693D",
    height: 58,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});