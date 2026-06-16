import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfilScreen() {
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
        <View style={styles.avatar}>
          <MaterialIcons
            name="person"
            size={55}
            color="#0E693D"
          />
        </View>

        <Text style={styles.name}>
          Utilisateur
        </Text>

        <Text style={styles.email}>
          Informations disponibles après connexion
        </Text>
      </View>

      {/* STATISTIQUES */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Demandes</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>En cours</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Validées</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.section}>
        <MenuItem
          icon="badge"
          title="Mes informations"
          subtitle="Consulter vos informations personnelles"
        />

        <MenuItem
          icon="edit"
          title="Modifier le profil"
          subtitle="Mettre à jour vos informations"
        />

        <MenuItem
          icon="description"
          title="Mes demandes"
          subtitle="Suivre vos démarches administratives"
        />

        <MenuItem
          icon="notifications"
          title="Notifications"
          subtitle="Consulter les dernières notifications"
        />

        <MenuItem
          icon="settings"
          title="Paramètres"
          subtitle="Préférences de l'application"
        />

        <MenuItem
          icon="support-agent"
          title="Aide & Support"
          subtitle="Contacter l'assistance"
        />
      </View>

      {/* VERSION */}
      <View style={styles.versionCard}>
        <Text style={styles.versionTitle}>
          Sunu Mairie
        </Text>

        <Text style={styles.versionText}>
          Version 1.0.0
        </Text>
      </View>

      {/* DECONNEXION */}
      <TouchableOpacity style={styles.logoutButton}>
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

function MenuItem({
  icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.iconWrapper}>
        <MaterialIcons
          name={icon}
          size={22}
          color="#0E693D"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>
          {title}
        </Text>

        <Text style={styles.menuSubtitle}>
          {subtitle}
        </Text>
      </View>

      <MaterialIcons
        name="chevron-right"
        size={24}
        color="#94A3B8"
      />
    </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "700",
    color: "#FFF",
  },

  email: {
    marginTop: 5,
    color: "#D1FAE5",
    fontSize: 14,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: -25,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    borderRadius: 18,
    padding: 16,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 4,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0E693D",
  },

  statLabel: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 12,
  },

  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,

    elevation: 2,
  },

  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E293B",
  },

  menuSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#64748B",
  },

  versionCard: {
    alignItems: "center",
    marginTop: 20,
  },

  versionTitle: {
    fontWeight: "700",
    color: "#0E693D",
  },

  versionText: {
    marginTop: 4,
    color: "#94A3B8",
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
    marginLeft: 10,
    fontSize: 15,
  },
});