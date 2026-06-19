import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import DemandesScreen from "../screens/demande/DemandesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfilScreen from "../screens/profile/ProfilScreen";

const Tab = createBottomTabNavigator();

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Accueil: "home",
  Demandes: "document-text",
  Notifications: "notifications",
  Profil: "person",
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,

        tabBarStyle: styles.tabBar,

        tabBarIcon: ({ focused }) => {
          const iconName = ICONS[route.name] ?? "home";

          return (
            <View style={styles.iconContainer}>
              <View
                style={[
                  styles.badge,
                  focused && styles.badgeActive,
                ]}
              >
                <Ionicons
                  name={iconName}
                  size={focused ? 26 : 24}
                  color={focused ? "#FFF" : "#94A3B8"}
                />
              </View>
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Demandes"
        component={DemandesScreen}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#FFF",
    borderTopWidth: 0,
    paddingHorizontal: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 10,
  },

  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeActive: {
    backgroundColor: "#0E693D",
    marginTop: -22,
    shadowColor: "#0E693D",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
