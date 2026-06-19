import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/home/HomeScreen";
import DemandesScreen from "../screens/demande/DemandesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfilScreen from "../screens/profile/ProfilScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        // Cache le tab quand le clavier est ouvert
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          height: 75,

          borderRadius: 25,
          backgroundColor: "#FFF",
          borderTopWidth: 0,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.08,
          shadowRadius: 15,
          elevation: 10,
        },

        tabBarIcon: ({ focused }) => {
          let iconName:
            | "home"
            | "document-text"
            | "notifications"
            | "person" = "home";

          switch (route.name) {
            case "Accueil":
              iconName = "home";
              break;

            case "Demandes":
              iconName = "document-text";
              break;

            case "Notifications":
              iconName = "notifications";
              break;

            case "Profil":
              iconName = "person";
              break;
          }

          return (
            <View
              style={{
                width: focused ? 58 : 45,
                height: focused ? 58 : 45,
                borderRadius: 30,

                backgroundColor: focused
                  ? "#0E693D"
                  : "transparent",

                justifyContent: "center",
                alignItems: "center",

                marginTop: focused ? -25 : 0,

                shadowColor: focused
                  ? "#0E693D"
                  : "transparent",

                shadowOffset: {
                  width: 0,
                  height: 8,
                },

                shadowOpacity: 0.35,
                shadowRadius: 10,
                elevation: focused ? 8 : 0,
              }}
            >
              <Ionicons
                name={iconName}
                size={focused ? 28 : 24}
                color={focused ? "#FFF" : "#94A3B8"}
              />
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