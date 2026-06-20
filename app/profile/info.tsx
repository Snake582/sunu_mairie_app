import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { IconSymbol } from "~/components/ui/IconSymbol";

export default function ProfileInfoScreen() {
	const { user: userParam } = useLocalSearchParams<{ user: string }>();
	const user = userParam ? JSON.parse(userParam) : null;

	const InfoCard = ({
		icon,
		label,
		value,
	}: {
		icon: any;
		label: string;
		value: string;
	}) => (
		<View style={styles.infoCard}>
			<View style={styles.iconContainer}>
				<IconSymbol name={icon} size={24} color="#0E693D" />
			</View>

			<View style={{ flex: 1 }}>
				<Text style={styles.label}>{label}</Text>

				<Text style={styles.value}>{value || "-"}</Text>
			</View>
		</View>
	);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Image
					source={{
						uri: user?.photo || "https://via.placeholder.com/150",
					}}
					style={styles.avatar}
				/>

				<Text style={styles.name}>{user?.fullName || "-"}</Text>

				<Text style={styles.email}>{user?.email || "-"}</Text>
			</View>

			<View style={styles.content}>
				<Text style={styles.sectionTitle}>Informations personnelles</Text>

				<InfoCard icon="person" label="Nom complet" value={user?.fullName} />

				<InfoCard icon="email" label="Adresse email" value={user?.email} />

				<InfoCard icon="phone" label="Téléphone" value={user?.phone} />

				<InfoCard icon="location-on" label="Adresse" value={user?.adresse} />

				<InfoCard icon="badge" label="Numéro CNI" value={user?.numeroCni} />
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
		paddingTop: 50,
		paddingBottom: 35,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},

	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
		borderWidth: 4,
		borderColor: "#FFF",
	},

	name: {
		marginTop: 15,
		fontSize: 24,
		fontWeight: "700",
		color: "#FFF",
	},

	email: {
		marginTop: 5,
		fontSize: 14,
		color: "#D1FAE5",
	},

	content: {
		padding: 20,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#1E293B",
		marginBottom: 15,
	},

	infoCard: {
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
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#ECFDF5",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
	},

	label: {
		fontSize: 13,
		color: "#64748B",
	},

	value: {
		marginTop: 4,
		fontSize: 15,
		fontWeight: "600",
		color: "#1E293B",
	},
});
