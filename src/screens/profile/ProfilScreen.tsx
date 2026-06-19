import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfilScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "http://192.168.1.8:3000/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("PROFILE RESPONSE:", data);
      setUser(data.user || data.data || data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  console.log("PHOTO UPDATED:", user?.photo);
}, [user]);

const getPhoto = () => {
  if (!user?.photo) return "https://via.placeholder.com/150";

  if (user.photo.startsWith("http")) return user.photo;

  if (user.photo.startsWith("uploads/")) {
    return `http://192.168.1.8:3000/${user.photo}`;
  }

  return `http://192.168.1.8:3000/uploads/${user.photo}`;
};

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (!user) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Aucune donnée utilisateur</Text>
    </View>
  );
}

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
          <Image
             source={{ uri: getPhoto() }}
             style={{ width: 120, height: 120, borderRadius: 60 }}
           />
        </View>

        <Text style={styles.name}>
          {user?.fullName}
        </Text>

        <Text style={styles.email}>
          {user?.email ?? "utilisateur"}
        </Text>

        <Text style={styles.info}>
          {user?.adresse ?? "Adresse"}
        </Text>

        <Text style={styles.info}>
          {user?.numeroCni ?? "Numéro CNI"}
        </Text>
      </View>

      {/* MENU */}
      <View style={styles.section}>
        <MenuItem
          icon="badge"
          title="Mes informations"
          subtitle="Consulter vos informations personnelles"
          onPress={() => navigation.navigate("MesInformations", {user})}
        />

        <MenuItem
          icon="edit"
          title="Modifier le profil"
          subtitle="Mettre à jour vos informations"
          onPress={() => navigation.navigate("EditProfil", {user})}
        />

        <MenuItem
          icon="settings"
          title="Paramètres"
          subtitle="Préférences de l'application"
          onPress={() => navigation.navigate("Parametres")}
        />

        <MenuItem
          icon="support-agent"
          title="Aide & Support"
          subtitle="Contacter l'assistance"
          onPress={() => navigation.navigate("AideSupport")}
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
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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
  onPress,
}: {
  icon: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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

  info: {
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