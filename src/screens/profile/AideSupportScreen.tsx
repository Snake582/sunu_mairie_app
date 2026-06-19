import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AideSupportScreen() {
  const openEmail = () => {
    Linking.openURL(
      "mailto:support@sunumairie.com"
    );
  };

  const openPhone = () => {
    Linking.openURL(
      "tel:+221706063217"
    );
  };

  const openWhatsApp = () => {
    Linking.openURL(
      "https://wa.me/221706063217"
    );
  };

  const SupportCard = ({
    icon,
    title,
    subtitle,
    onPress,
  }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={icon}
          size={28}
          color="#0E693D"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>
          {title}
        </Text>

        <Text style={styles.cardSubtitle}>
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

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <MaterialIcons
          name="support-agent"
          size={45}
          color="#FFF"
        />

        <Text style={styles.headerTitle}>
          Aide & Support
        </Text>

        <Text style={styles.headerSubtitle}>
          Nous sommes là pour vous aider
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          Nous contacter
        </Text>

        <SupportCard
          icon="email"
          title="Envoyer un email"
          subtitle="support@sunumairie.com"
          onPress={openEmail}
        />

        <SupportCard
          icon="phone"
          title="Appeler le support"
          subtitle="+221 70 606 32 17"
          onPress={openPhone}
        />

        <SupportCard
          icon="chat"
          title="WhatsApp"
          subtitle="Discussion instantanée"
          onPress={openWhatsApp}
        />

        <Text style={styles.sectionTitle}>
          Questions fréquentes
        </Text>

        <View style={styles.faqCard}>
          <Text style={styles.question}>
            Comment suivre ma demande ?
          </Text>

          <Text style={styles.answer}>
            Rendez-vous dans la rubrique
            "Mes demandes" pour consulter
            l'état d'avancement de vos
            démarches administratives.
          </Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.question}>
            Comment modifier mes informations ?
          </Text>

          <Text style={styles.answer}>
            Depuis votre profil, cliquez sur
            "Modifier le profil".
          </Text>
        </View>

        <View style={styles.faqCard}>
          <Text style={styles.question}>
            Comment récupérer mon mot de passe ?
          </Text>

          <Text style={styles.answer}>
            Utilisez l'option "Mot de passe oublié"
            depuis l'écran de connexion.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Sunu Mairie
          </Text>

          <Text style={styles.footerText}>
            Faciliter les démarches administratives
            des citoyens.
          </Text>
        </View>
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

  content: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 15,
    marginTop: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 18,
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

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },

  cardSubtitle: {
    marginTop: 3,
    color: "#64748B",
    fontSize: 13,
  },

  faqCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
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

  question: {
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },

  answer: {
    color: "#64748B",
    lineHeight: 22,
  },

  footer: {
    marginTop: 25,
    alignItems: "center",
    marginBottom: 30,
  },

  footerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0E693D",
  },

  footerText: {
    marginTop: 5,
    color: "#64748B",
    textAlign: "center",
  },
});