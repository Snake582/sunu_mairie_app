import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Dot = ({ selected }: any) => (
  <View
    style={[
      styles.dot,
      {
        backgroundColor: selected ? "#0E693D" : "#D1D5DB",
        width: selected ? 24 : 8,
      },
    ]}
  />
);

const Skip = ({ ...props }: any) => (
  <TouchableOpacity {...props}>
    <Text style={styles.skip}>Passer</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }: any) => (
  <TouchableOpacity style={styles.nextButton} {...props}>
    <Text style={styles.nextText}>Suivant</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }: any) => (
  <TouchableOpacity style={styles.doneButton} {...props}>
    <Text style={styles.doneText}>Commencer</Text>
  </TouchableOpacity>
);

export default function OnboardingScreen({ navigation }: any) {
  return (
    <Onboarding
      DotComponent={Dot}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.replace("Login")}
      pages={[
        {
          backgroundColor: "#F8FAFC",
          image: (
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo-removebg-preview.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          ),
          title: "Bienvenue sur Sunu Mairie",
          subtitle:
            "Tous les services municipaux accessibles en quelques clics, partout et à tout moment.",
        },

        {
          backgroundColor: "#FFFFFF",
          image: (
            <View style={styles.cardIcon}>
              <Text style={styles.icon}>📄</Text>
            </View>
          ),
          title: "Documents Administratifs",
          subtitle:
            "Demandez vos actes et certificats sans déplacement et recevez des notifications en temps réel.",
        },

        {
          backgroundColor: "#F8FAFC",
          image: (
            <View style={styles.cardIcon}>
              <Text style={styles.icon}>📸</Text>
            </View>
          ),
          title: "Signalements Citoyens",
          subtitle:
            "Photographiez un problème dans votre commune et suivez sa résolution étape par étape.",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 10,
  },

  image: {
    width: 220,
    height: 220,
  },

  cardIcon: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#22C55E",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 10,
  },

  icon: {
    fontSize: 90,
  },

  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  skip: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 20,
  },

  nextButton: {
    backgroundColor: "#0E693D",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 15,
  },

  nextText: {
    color: "#FFF",
    fontWeight: "700",
  },

  doneButton: {
    backgroundColor: "#F59E0B",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    marginRight: 15,
  },

  doneText: {
    color: "#FFF",
    fontWeight: "700",
  },
});