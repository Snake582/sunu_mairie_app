import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

export default function DemandesScreen() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      const response = await fetch(
        `${API_URL}/requests/my-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("REQUESTS :", data);

      setRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const total = requests.length;

  const enCours = requests.filter(
    (item) => item.status === "pending"
  ).length;

  const validees = requests.filter(
    (item) => item.status === "approved"
  ).length;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "#F59E0B",
          icon: "schedule",
          label: "En attente",
        };

      case "approved":
        return {
          color: "#22C55E",
          icon: "check-circle",
          label: "Validée",
        };

      case "ready":
        return {
          color: "#3B82F6",
          icon: "inventory",
          label: "Prête",
        };

      case "rejected":
        return {
          color: "#EF4444",
          icon: "cancel",
          label: "Rejetée",
        };

      default:
        return {
          color: "#94A3B8",
          icon: "help",
          label: status,
        };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0E693D"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Mes Demandes
        </Text>

        <Text style={styles.headerSubtitle}>
          Suivez l'évolution de vos démarches
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {total}
          </Text>

          <Text style={styles.statLabel}>
            Total
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {enCours}
          </Text>

          <Text style={styles.statLabel}>
            En cours
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {validees}
          </Text>

          <Text style={styles.statLabel}>
            Validées
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#0E693D"
          />

          <Text style={styles.loadingText}>
            Chargement des demandes...
          </Text>
        </View>
      ) : requests.length === 0 ? (
        <View style={styles.center}>
          <MaterialIcons
            name="folder-open"
            size={80}
            color="#CBD5E1"
          />

          <Text style={styles.emptyTitle}>
            Aucune demande
          </Text>

          <Text style={styles.emptyText}>
            Vos demandes apparaîtront ici après
            soumission.
          </Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) =>
            item.id.toString()
          }
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const config = getStatusConfig(
              item.status
            );

            return (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
              >
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: `${config.color}20`,
                    },
                  ]}
                >
                  <MaterialIcons
                    name={config.icon as any}
                    size={30}
                    color={config.color}
                  />
                </View>

                <View style={styles.content}>
                  <Text style={styles.service}>
                    {item.type}
                  </Text>

                  <Text style={styles.numero}>
                    Dossier #{item.id}
                  </Text>

                  <Text style={styles.date}>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </Text>

                  <View
                    style={[
                      styles.status,
                      {
                        backgroundColor:
                          config.color,
                      },
                    ]}
                  >
                    <Text
                      style={styles.statusText}
                    >
                      {config.label}
                    </Text>
                  </View>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
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

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 10,
  },

  statCard: {
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0E693D",
  },
  statLabel: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#64748B",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#334155",
    marginTop: 10,
  },

  emptyText: {
    color: "#64748B",
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 20,
  },

  list: {
    padding: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 15,
  },

  service: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },

  numero: {
    color: "#64748B",
    marginTop: 4,
  },

  date: {
    color: "#94A3B8",
    marginTop: 2,
    fontSize: 12,
  },

  status: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  statusText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
});