import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import DemandesScreen from "../screens/demande/DemandesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfilScreen from "../screens/profile/ProfilScreen";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Accueil") {
            iconName = "home";
          }

          if (route.name === "Demandes") {
            iconName = "document-text";
          }

          if (route.name === "Notifications") {
            iconName = "notifications";
          }

          if (route.name === "Profil") {
            iconName = "person";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: "#1B2A4A",
        tabBarInactiveTintColor: "gray",
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