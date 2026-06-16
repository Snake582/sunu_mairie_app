import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const services = [
  {
    id: "1",
    title: "Acte de naissance",
    icon: "description",
    screen: "ActeNaissance",
  },
  {
    id: "2",
    title: "Signalement",
    icon: "report",
    screen: "Signal",
  },
  {
    id: "3",
    title: "Certificat de mariage",
    icon: "favorite",
    screen: "Mariage",
  },
  {
    id: "4",
    title: "Certificat de décès",
    icon: "article",
    screen: "Deces",
  },
  {
    id: "5",
    title: "Occupation",
    icon: "place",
    screen: "Occupation",
  },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* LOGO */}
      <Image
        source={require("../../../assets/logo-removebg-preview.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Bonjour 👋</Text>
        <Text style={styles.subtitleHeader}>
          Bienvenue sur Sunu Mairie
        </Text>
      </View>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Sunu Mairie</Text>

        <Text style={styles.bannerSubtitle}>
          Effectuez vos démarches administratives en ligne sans vous déplacer,
          rapidement et en toute sécurité.
        </Text>

        <TouchableOpacity
          style={styles.bannerButton}
          onPress={() => navigation.navigate("Demandes")}
        >
          <Text style={styles.bannerButtonText}>
            Voir mes demandes
          </Text>
        </TouchableOpacity>
      </View>

      {/* SECTION TITLE */}
      <Text style={styles.sectionTitle}>
        Services municipaux
      </Text>

      {/* SERVICES */}
      <FlatList
        data={services}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialIcons
              name={item.icon as any}
              size={40}
              color="#0E693D"
            />
            <Text style={styles.serviceTitle}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  logo: {
    width: "90%",
    height: 120,
    alignSelf: "center",
    marginTop: 30,
  },

  header: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitleHeader: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  banner: {
    margin: 20,
    backgroundColor: "#0E693D",
    borderRadius: 28,
    padding: 22,
  },

  bannerTitle: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "700",
  },

  bannerSubtitle: {
    color: "#E2E8F0",
    marginTop: 10,
    lineHeight: 20,
  },

  bannerButton: {
    marginTop: 18,
    backgroundColor: "#FFF",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  bannerButtonText: {
    color: "#0E693D",
    fontWeight: "700",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 20,
    marginVertical: 15,
    color: "#1E293B",
  },

  serviceCard: {
    width: "47%",
    backgroundColor: "#FFF",
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  serviceTitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
  },
});