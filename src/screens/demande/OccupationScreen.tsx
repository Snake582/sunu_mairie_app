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

export default function OccupationScreen() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");

  const [typeOccupation, setTypeOccupation] = useState("");
  const [lieuOccupation, setLieuOccupation] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [description, setDescription] = useState("");

  const [photoLieu, setPhotoLieu] = useState<string | null>(null);
  const [pieceIdentite, setPieceIdentite] = useState<string | null>(null);

  const pickImage = async (
    type: "photo" | "piece"
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
      if (type === "photo") {
        setPhotoLieu(result.assets[0].uri);
      } else {
        setPieceIdentite(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    if (
      !prenom ||
      !nom ||
      !telephone ||
      !typeOccupation ||
      !lieuOccupation ||
      !dateDebut ||
      !dateFin
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
            `{API_URL}/requests`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                type: "mariage",
                data: {
                  prenom,
                  nom,
                  typeOccupation,
                  lieuOccupation,
                  dateDebut,
                  dateFin,
                  pieceIdentite,
                  telephone,
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
    
          setPrenom("");
          setNom("");
          setTypeOccupation("");
          setLieuOccupation("");
          setDateDebut("");
          setDateFin("");
          setPieceIdentite("");
          setTelephone("");
    
          Alert.alert(
            "Demande enregistrée",
            "Votre demande de certificat de mariage a été envoyée avec succès."
          );
        } catch (error: any) {
          console.log(error);
    Alert.alert(
      "Demande enregistrée",
      "Votre demande d'autorisation d'occupation a été envoyée avec succès."
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
        backgroundColor="#0E693D"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Autorisation d'occupation
        </Text>

        <Text style={styles.headerSubtitle}>
          Demandez une autorisation d'occupation temporaire du domaine public.
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
            Fournissez des informations précises afin de faciliter le traitement
            de votre demande.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Informations du demandeur
        </Text>

        <TextInput
          placeholder="Prénom"
          style={styles.input}
          value={prenom}
          onChangeText={setPrenom}
        />

        <TextInput
          placeholder="Nom"
          style={styles.input}
          value={nom}
          onChangeText={setNom}
        />

        <TextInput
          placeholder="Téléphone"
          keyboardType="phone-pad"
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
        />

        <Text style={styles.sectionTitle}>
          Informations de l'occupation
        </Text>

        <TextInput
          placeholder="Type d'occupation"
          style={styles.input}
          value={typeOccupation}
          onChangeText={setTypeOccupation}
        />

        <TextInput
          placeholder="Adresse ou lieu précis"
          style={styles.input}
          value={lieuOccupation}
          onChangeText={setLieuOccupation}
        />

        <TextInput
          placeholder="Date de début"
          style={styles.input}
          value={dateDebut}
          onChangeText={setDateDebut}
        />

        <TextInput
          placeholder="Date de fin"
          style={styles.input}
          value={dateFin}
          onChangeText={setDateFin}
        />

        <TextInput
          placeholder="Description détaillée de l'activité"
          multiline
          textAlignVertical="top"
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.sectionTitle}>
          Photo ou plan du lieu
        </Text>

        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage("photo")}
          >
          {photoLieu ? (
            <Image
              source={{ uri: photoLieu }}
              style={styles.preview}
            />
          ) : (
            <>
              <MaterialIcons
                name="photo-camera"
                size={45}
                color="#0E693D"
                />
              <Text style={styles.uploadText}>
                Ajouter une photo
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Pièce d'identité
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
                Ajouter votre pièce d'identité
              </Text>
            </>
          )}
        </TouchableOpacity>

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
    backgroundColor: "#ECFDF5",
    padding: 15,
    borderRadius: 16,
    marginBottom: 25,
    alignItems: "center",
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

  textArea: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 15,
    height: 120,
    marginBottom: 20,
    elevation: 2,
  },

  uploadBox: {
    height: 180,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#0E693D",
    borderStyle: "dashed",
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

  button: {
    backgroundColor: "#0E693D",
    height: 58,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
});