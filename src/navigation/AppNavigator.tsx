import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import TabNavigator from "./TabNavigator";
import ActeNaissanceScreen from "../screens/demande/ActeNaissanceScreen";
import MariageScreen from "../screens/demande/MariageScreen";
import DecesScreen from "../screens/demande/DecesScreen";
import OccupationScreen from "../screens/demande/OccupationScreen";
import SignalScreen from "../screens/demande/SignalScreen";
import AideSupportScreen from "../screens/profile/AideSupportScreen";
import ParametresScreen from "../screens/profile/ParametresScreen";
import EditProfilScreen from "../screens/profile/EditProfilScreen";
import MesInformationsScreen from "../screens/profile/MesInformationsScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        />
        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Main"
          component={TabNavigator}
        />

        <Stack.Screen
          name="ActeNaissance"
          component={ActeNaissanceScreen}
        />

        <Stack.Screen
            name="Signal"
            component={SignalScreen}
        />

        <Stack.Screen
            name="Mariage"
            component={MariageScreen}
        />

        <Stack.Screen
            name="Deces"
            component={DecesScreen}
        />

        <Stack.Screen
            name="Occupation"
            component={OccupationScreen}
        />

        <Stack.Screen
          name="MesInformations"
          component={MesInformationsScreen}
        />

        <Stack.Screen
          name="EditProfil"
          component={EditProfilScreen}
        />

        <Stack.Screen
          name="Parametres"
          component={ParametresScreen}
        />

        <Stack.Screen
          name="AideSupport"
          component={AideSupportScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}