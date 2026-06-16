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
// import axios from "axios";

type Demande = {
  id: string;
  numero: string;
  service: string;
  date: string;
  status: string;
};

export default function DemandesScreen() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      // const response = await axios.get(
      //   "http://TON_BACKEND/api/demandes"
      // );
      //
      // setDemandes(response.data);

      // temporaire
      setDemandes([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "EN_ATTENTE":
        return {
          color: "#F59E0B",
          icon: "schedule",
          label: "En attente",
        };

      case "VALIDE":
        return {
          color: "#22C55E",
          icon: "check-circle",
          label: "Validé",
        };

      case "PRET":
        return {
          color: "#3B82F6",
          icon: "inventory",
          label: "Prêt à retirer",
        };

      case "REJETE":
        return {
          color: "#EF4444",
          icon: "cancel",
          label: "Rejeté",
        };

      default:
        return {
          color: "#94A3B8",
          icon: "help",
          label: status,
        };
    }
  };

  const total = demandes.length;

  const enCours = demandes.filter(
    (d) => d.status === "EN_ATTENTE"
  ).length;

  const validees = demandes.filter(
    (d) => d.status === "VALIDE"
  ).length;

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
      ) : demandes.length === 0 ? (
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
          data={demandes}
          keyExtractor={(item) => item.id}
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
                      backgroundColor:
                        `${config.color}20`,
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
                    {item.service}
                  </Text>

                  <Text style={styles.numero}>
                    Dossier : {item.numero}
                  </Text>

                  <Text style={styles.date}>
                    Déposé le {item.date}
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