import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { IconSymbol } from "~/components/ui/IconSymbol";

const notifications = [
  {
    id: "1",
    type: "success",
    title: "Acte de naissance",
    message: "Votre demande a été enregistrée avec succès.",
    date: "Aujourd'hui • 09:15",
    unread: true,
  },
  {
    id: "2",
    type: "validated",
    title: "Certificat de résidence",
    message: "Votre demande a été validée.",
    date: "Hier • 15:30",
    unread: true,
  },
  {
    id: "3",
    type: "document",
    title: "Certificat de mariage",
    message: "Votre document est prêt à être retiré.",
    date: "12 Juin 2026 • 11:00",
    unread: false,
  },
];

const getNotificationConfig = (type: string) => {
  switch (type) {
    case "success":
      return {
        icon: "notifications-active" as const,
        color: "#F59E0B",
      };

    case "validated":
      return {
        icon: "check-circle" as const,
        color: "#22C55E",
      };

    case "document":
      return {
        icon: "description" as const,
        color: "#3B82F6",
      };

    default:
      return {
        icon: "notifications" as const,
        color: "#9CA3AF",
      };
  }
};

export default function NotificationsScreen() {
  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0E693D"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Notifications
          </Text>

          <Text style={styles.subtitle}>
            {unreadCount} notification(s) non lue(s)
          </Text>
        </View>

        <TouchableOpacity style={styles.markAllButton}>
          <IconSymbol
            name="done-all"
            size={20}
            color="#0E693D"
          />
        </TouchableOpacity>
      </View>

      {/* LISTE */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const config = getNotificationConfig(item.type);

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[
                styles.card,
                item.unread && styles.unreadCard,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: `${config.color}15`,
                  },
                ]}
              >
                <IconSymbol
                  name={config.icon}
                  size={28}
                  color={config.color}
                />
              </View>

              <View style={styles.content}>
                <View style={styles.topRow}>
                  <Text style={styles.notificationTitle}>
                    {item.title}
                  </Text>

                  {item.unread && (
                    <View style={styles.unreadDot} />
                  )}
                </View>

                <Text style={styles.message}>
                  {item.message}
                </Text>

                <Text style={styles.date}>
                  {item.date}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: "#D1FAE5",
    marginTop: 6,
    fontSize: 14,
  },

  markAllButton: {
    width: 45,
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    padding: 20,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,

    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 3,
  },

  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#0E693D",
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

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
  },

  message: {
    marginTop: 6,
    color: "#64748B",
    lineHeight: 20,
  },

  date: {
    marginTop: 10,
    fontSize: 12,
    color: "#94A3B8",
  },
});
