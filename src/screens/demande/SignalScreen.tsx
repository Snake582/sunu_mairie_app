import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function SignalScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);

  const handleTakePhoto = async () => {
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    alert("Autorisation caméra refusée");
    return;
  }

  const result =
    await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

const getCurrentLocation = async () => {
  const { status } =
    await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    alert("Permission de localisation refusée");
    return;
  }

  const current =
    await Location.getCurrentPositionAsync({});

  setLocation(current.coords);
};

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0E693D"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Signaler un problème
        </Text>

        <Text style={styles.subtitle}>
          Aidez-nous à améliorer votre commune en signalant
          les incidents rencontrés.
        </Text>
      </View>

      {/* PHOTO */}
      <View style={styles.section}>
        <Text style={styles.label}>
          Photo du problème
        </Text>

        <TouchableOpacity
          style={styles.imagePicker}
          onPress={handleTakePhoto}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          ) : (
            <>
              <MaterialIcons
                name="photo-camera"
                size={45}
                color="#0E693D"
              />

              <Text style={styles.imageText}>
                Ajouter une photo
              </Text>

              <Text style={styles.imageSubText}>
                Prenez ou sélectionnez une photo
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraButton}>
          <MaterialIcons
            name="camera-alt"
            size={20}
            color="#FFF"
          />

          <Text style={styles.cameraButtonText}>
            Ouvrir la caméra
          </Text>
        </TouchableOpacity>
      </View>

      {/* FORMULAIRE */}
      <View style={styles.form}>
        <Text style={styles.label}>
          Type de problème
        </Text>

        <TextInput
          placeholder="Ex : Route dégradée, éclairage public..."
          style={styles.input}
        />
        {location && (
          <View style={styles.locationCard}>
            <MaterialIcons
              name="location-on"
              size={20}
              color="#0E693D"
            />

            <Text style={styles.locationText}>
              Position détectée
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
        <MaterialIcons
          name="my-location"
          size={20}
          color="#FFF"
        />

        <Text style={styles.locationButtonText}>
          Utiliser ma position
        </Text>
      </TouchableOpacity>

        <Text style={styles.label}>
          Localisation
        </Text>

        <TextInput
          placeholder="Adresse ou quartier"
          style={styles.input}
        />

        <Text style={styles.label}>
          Téléphone
        </Text>

        <TextInput
          placeholder="+221 XX XXX XX XX"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          placeholder="Décrivez le problème rencontré..."
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          style={styles.textArea}
        />

        <TouchableOpacity style={styles.submitButton}>
          <MaterialIcons
            name="campaign"
            size={22}
            color="#FFF"
          />

          <Text style={styles.submitText}>
            Envoyer le signalement
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "#D1FAE5",
    marginTop: 8,
    lineHeight: 22,
  },

  section: {
    padding: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 10,
  },

  imagePicker: {
    height: 220,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#0E693D",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  imageText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  imageSubText: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 13,
  },

  cameraButton: {
    marginTop: 15,
    backgroundColor: "#0E693D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
  },

  cameraButtonText: {
    color: "#FFF",
    fontWeight: "600",
    marginLeft: 8,
  },

  form: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 55,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,

    elevation: 2,
  },

  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E8F0",
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
  },

  locationText: {
    marginLeft: 10,
    color: "#1E293B",
    fontSize: 14,
  },

  locationButton: {
    backgroundColor: "#0E693D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 18,
  },

  locationButtonText: {
    color: "#FFF",
    fontWeight: "600",
    marginLeft: 8,
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
    shadowOpacity: 0.04,
    shadowRadius: 5,

    elevation: 2,
  },

  submitButton: {
    backgroundColor: "#DC2626",
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  submitText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
});