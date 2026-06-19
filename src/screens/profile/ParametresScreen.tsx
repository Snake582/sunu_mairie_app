import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ParametresScreen({
  navigation,
}: any) {
  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  const logout = async () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Oui",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(
              "token"
            );

            navigation.replace("Login");
          },
        },
      ]
    );
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    right,
    onPress,
  }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.iconBox}>
        <MaterialIcons
          name={icon}
          size={24}
          color="#0E693D"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.titleItem}>
          {title}
        </Text>

        <Text style={styles.subtitleItem}>
          {subtitle}
        </Text>
      </View>

      {right}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <MaterialIcons
          name="settings"
          size={42}
          color="#FFF"
        />

        <Text style={styles.headerTitle}>
          Paramètres
        </Text>

        <Text style={styles.headerSubtitle}>
          Configurez votre expérience
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Préférences
        </Text>

        <SettingItem
          icon="notifications"
          title="Notifications"
          subtitle="Recevoir les mises à jour"
          right={
            <Switch
              value={notifications}
              onValueChange={
                setNotifications
              }
            />
          }
        />

        <SettingItem
          icon="dark-mode"
          title="Mode sombre"
          subtitle="Disponible prochainement"
          right={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Compte
        </Text>

        <SettingItem
          icon="lock"
          title="Mot de passe"
          subtitle="Modifier votre mot de passe"
          onPress={() =>
            Alert.alert(
              "Bientôt disponible"
            )
          }
          right={
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#94A3B8"
            />
          }
        />

        <SettingItem
          icon="privacy-tip"
          title="Confidentialité"
          subtitle="Politique de confidentialité"
          onPress={() =>
            Alert.alert(
              "Politique de confidentialité"
            )
          }
          right={
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#94A3B8"
            />
          }
        />

        <SettingItem
          icon="info"
          title="À propos"
          subtitle="Version 1.0.0"
          onPress={() =>
            Alert.alert(
              "Sunu Mairie",
              "Version 1.0.0"
            )
          }
          right={
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#94A3B8"
            />
          }
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <MaterialIcons
          name="logout"
          size={22}
          color="#FFF"
        />

        <Text style={styles.logoutText}>
          Déconnexion
        </Text>
      </TouchableOpacity>
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
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
  },

  headerSubtitle: {
    marginTop: 5,
    color: "#D1FAE5",
    fontSize: 14,
  },

  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 15,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 3,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  titleItem: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },

  subtitleItem: {
    marginTop: 3,
    fontSize: 12,
    color: "#64748B",
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    margin: 20,
    paddingVertical: 16,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 8,
  },
});