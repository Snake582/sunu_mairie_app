import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { View, Text, Image, StyleSheet } from "react-native";

export default function OnboardingScreen({
  navigation,
}: any) {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#F8FAFC",

          image: (
            <Image
              source={require("../../../assets/logo-removebg-preview.png")}
              style={styles.image}
              resizeMode="contain"
            />
          ),

          title: "Bienvenue sur Sunu Mairie",

          subtitle:
            "Accédez aux services municipaux directement depuis votre téléphone.",
        },

        {
          backgroundColor: "#FFFFFF",

          image: (
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>📄</Text>
            </View>
          ),

          title: "Documents Administratifs",

          subtitle:
            "Demandez vos actes de naissance, certificats de résidence, mariages et autres documents sans vous déplacer.",
        },

        {
          backgroundColor: "#F8FAFC",

          image: (
            <View style={styles.iconContainer}>
              <Text style={styles.emoji}>📸</Text>
            </View>
          ),

          title: "Signalements Citoyens",

          subtitle:
            "Prenez une photo d'un problème dans votre commune et suivez son traitement en temps réel.",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },

  iconContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#0E693D15",
    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    fontSize: 90,
  },
});