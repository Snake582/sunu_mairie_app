import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="onboarding" />
			<Stack.Screen name="login" />
			<Stack.Screen name="register" />
			<Stack.Screen name="forgot-password" />
			<Stack.Screen name="reset-password" />
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="request" />
			<Stack.Screen name="profile" />
		</Stack>
	);
}
