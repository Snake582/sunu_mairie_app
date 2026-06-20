import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { IconSymbol } from "~/components/ui/IconSymbol";

const TABS = [
	{ name: "index", title: "Accueil", icon: "home" as const },
	{ name: "demandes", title: "Demandes", icon: "document-text" as const },
	{ name: "notifications", title: "Notifications", icon: "notifications" as const },
	{ name: "profile", title: "Profil", icon: "person" as const },
];

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: styles.tabBar,
				tabBarIcon: ({ focused }) => {
					const config = TABS.find((t) => t.name === route.name);
					if (!config) return null;

					return (
						<View style={styles.iconContainer}>
							<View style={[styles.badge, focused && styles.badgeActive]}>
								<IconSymbol
									name={config.icon}
									size={focused ? 26 : 24}
									color={focused ? "#FFF" : "#94A3B8"}
									weight={focused ? "semibold" : "regular"}
								/>
							</View>
						</View>
					);
				},
			})}
		>
			<Tabs.Screen name="index" options={{ title: "Accueil" }} />
			<Tabs.Screen name="demandes" options={{ title: "Demandes" }} />
			<Tabs.Screen name="notifications" options={{ title: "Notifications" }} />
			<Tabs.Screen name="profile" options={{ title: "Profil" }} />
		</Tabs>
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
