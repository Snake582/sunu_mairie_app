import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	StatusBar,
	Image,
} from "react-native";
import { IconSymbol } from "~/components/ui/IconSymbol";

export default function ProfilScreen() {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadProfile();
	}, []);

	const loadProfile = async () => {
		setLoading(true);
		setError(null);

		try {
			const token = await AsyncStorage.getItem("token");

			if (!token) {
				setError("Vous n'êtes pas connecté.");
				return;
			}

			const API_URL = process.env.EXPO_PUBLIC_API_URL;

			if (!API_URL) {
				setError("Configuration manquante (API_URL).");
				return;
			}

			const response = await fetch(`${API_URL}/users/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			let data: any = null;
			const text = await response.text();

			try {
				data = text ? JSON.parse(text) : null;
			} catch {
				data = null;
			}

			console.log("PROFILE RESPONSE:", response.status, data);

			if (!response.ok) {
				if (response.status === 401) {
					await AsyncStorage.removeItem("token");
					setError("Session expirée. Veuillez vous reconnecter.");
					return;
				}

				setError(data?.message || `Erreur ${response.status}`);
				return;
			}

			const userData = data?.user ?? data?.data ?? data;

			if (!userData || typeof userData !== "object") {
				setError("Aucune donnée utilisateur reçue.");
				return;
			}

			setUser(userData);
		} catch (err: any) {
			console.log("PROFILE ERROR:", err);
			setError("Impossible de charger le profil. Vérifiez votre connexion.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log("PHOTO UPDATED:", user?.photo);
	}, [user]);

	const getPhoto = () => {
		if (!user?.photo) return "https://via.placeholder.com/150";

		if (user.photo.startsWith("http")) return user.photo;

		const API_URL = process.env.EXPO_PUBLIC_API_URL;

		if (user.photo.startsWith("uploads/")) {
			return `${API_URL}/${user.photo}`;
		}

		return `${API_URL}/uploads/${user.photo}`;
	};

	const logout = async () => {
		await AsyncStorage.removeItem("token");
		router.navigate("/login");
	};

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Chargement...</Text>
			</View>
		);
	}

	const displayName = user?.fullName ?? "-";
	const displayEmail = user?.email ?? "-";
	const displayAdresse = user?.adresse ?? "-";
	const displayCni = user?.numeroCni ?? "-";

	const canEdit = !!user;

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<StatusBar barStyle="light-content" backgroundColor="#0E693D" />

			{error ? (
				<View style={styles.errorBanner}>
					<IconSymbol name="info" size={20} color="#B91C1C" />

					<Text style={styles.errorText}>{error}</Text>

					<TouchableOpacity
						hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						onPress={loadProfile}
					>
						<Text style={styles.errorRetry}>Réessayer</Text>
					</TouchableOpacity>
				</View>
			) : null}

			{/* HEADER */}
			<View style={styles.header}>
				<View style={styles.avatar}>
					<Image
						source={{ uri: getPhoto() }}
						style={{ width: 120, height: 120, borderRadius: 60 }}
					/>
				</View>

				<Text style={styles.name}>{displayName}</Text>

				<Text style={styles.email}>{displayEmail}</Text>

				<Text style={styles.info}>{displayAdresse}</Text>

				<Text style={styles.info}>{displayCni}</Text>
			</View>

			{/* MENU */}
			<View style={styles.section}>
				<MenuItem
					icon="badge"
					title="Mes informations"
					subtitle="Consulter vos informations personnelles"
					disabled={!canEdit}
					onPress={() =>
						router.navigate({
							pathname: "/profile/info",
							params: { user: JSON.stringify(user ?? {}) },
						})
					}
				/>

				<MenuItem
					icon="edit"
					title="Modifier le profil"
					subtitle="Mettre à jour vos informations"
					disabled={!canEdit}
					onPress={() =>
						router.navigate({
							pathname: "/profile/edit",
							params: { user: JSON.stringify(user ?? {}) },
						})
					}
				/>

				<MenuItem
					icon="settings"
					title="Paramètres"
					subtitle="Préférences de l'application"
					onPress={() => router.navigate("/profile/settings")}
				/>

				<MenuItem
					icon="support-agent"
					title="Aide & Support"
					subtitle="Contacter l'assistance"
					onPress={() => router.navigate("/profile/support")}
				/>
			</View>

			{/* VERSION */}
			<View style={styles.versionCard}>
				<Text style={styles.versionTitle}>Sunu Mairie</Text>

				<Text style={styles.versionText}>Version 1.0.0</Text>
			</View>

			{/* DECONNEXION */}
			<TouchableOpacity
				style={styles.logoutButton}
				onPress={logout}
				activeOpacity={0.85}
			>
				<IconSymbol name="logout" size={22} color="#FFF" />

				<Text style={styles.logoutText}>Déconnexion</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

function MenuItem({
	icon,
	title,
	subtitle,
	disabled,
	onPress,
}: {
	icon: any;
	title: string;
	subtitle: string;
	disabled?: boolean;
	onPress?: () => void;
}) {
	return (
		<TouchableOpacity
			style={[styles.menuItem, disabled && styles.menuItemDisabled]}
			onPress={disabled ? undefined : onPress}
			disabled={disabled}
			activeOpacity={disabled ? 1 : 0.85}
		>
			<View style={[styles.iconWrapper, disabled && styles.iconWrapperDisabled]}>
				<IconSymbol name={icon} size={22} color={disabled ? "#94A3B8" : "#0E693D"} />
			</View>

			<View style={{ flex: 1 }}>
				<Text style={[styles.menuTitle, disabled && styles.menuTitleDisabled]}>
					{title}
				</Text>

				<Text style={styles.menuSubtitle}>{subtitle}</Text>
			</View>

			<IconSymbol name="chevron-right" size={24} color={disabled ? "#CBD5E1" : "#94A3B8"} />
		</TouchableOpacity>
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
		paddingTop: 60,
		paddingBottom: 35,
		borderBottomLeftRadius: 35,
		borderBottomRightRadius: 35,
	},

	avatar: {
		width: 110,
		height: 110,
		borderRadius: 55,
		backgroundColor: "#FFF",
		justifyContent: "center",
		alignItems: "center",
	},

	name: {
		marginTop: 15,
		fontSize: 24,
		fontWeight: "700",
		color: "#FFF",
	},

	email: {
		marginTop: 5,
		color: "#D1FAE5",
		fontSize: 14,
	},

	info: {
		marginTop: 5,
		color: "#D1FAE5",
		fontSize: 14,
	},

	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginTop: -25,
	},

	statCard: {
		flex: 1,
		backgroundColor: "#FFF",
		marginHorizontal: 5,
		borderRadius: 18,
		padding: 16,
		alignItems: "center",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.08,
		shadowRadius: 8,

		elevation: 4,
	},

	statNumber: {
		fontSize: 22,
		fontWeight: "700",
		color: "#0E693D",
	},

	statLabel: {
		marginTop: 4,
		color: "#64748B",
		fontSize: 12,
	},

	section: {
		marginTop: 25,
		paddingHorizontal: 20,
	},

	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFF",
		borderRadius: 20,
		padding: 16,
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

	menuItemDisabled: {
		backgroundColor: "#F1F5F9",
	},

	iconWrapper: {
		width: 46,
		height: 46,
		borderRadius: 23,
		backgroundColor: "#ECFDF5",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
	},

	iconWrapperDisabled: {
		backgroundColor: "#E2E8F0",
	},

	menuTitle: {
		fontSize: 15,
		fontWeight: "600",
		color: "#1E293B",
	},

	menuTitleDisabled: {
		color: "#64748B",
	},

	menuSubtitle: {
		marginTop: 2,
		fontSize: 12,
		color: "#64748B",
	},

	versionCard: {
		alignItems: "center",
		marginTop: 20,
	},

	versionTitle: {
		fontWeight: "700",
		color: "#0E693D",
	},

	versionText: {
		marginTop: 4,
		color: "#94A3B8",
	},

	logoutButton: {
		backgroundColor: "#DC2626",
		margin: 20,
		marginBottom: 110,
		paddingVertical: 16,
		borderRadius: 18,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	logoutText: {
		color: "#FFF",
		fontWeight: "700",
		marginLeft: 10,
		fontSize: 15,
	},

	emptyState: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
		backgroundColor: "#F8FAFC",
	},

	emptyTitle: {
		marginTop: 16,
		fontSize: 18,
		fontWeight: "600",
		color: "#1E293B",
		textAlign: "center",
	},

	emptySubtitle: {
		marginTop: 8,
		fontSize: 14,
		color: "#64748B",
		textAlign: "center",
	},

	retryButton: {
		marginTop: 24,
		backgroundColor: "#0E693D",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 14,
	},

	retryText: {
		color: "#FFF",
		fontWeight: "600",
		fontSize: 15,
	},

	errorBanner: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FEF2F2",
		marginHorizontal: 20,
		marginTop: 16,
		marginBottom: -10,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#FECACA",
	},

	errorText: {
		flex: 1,
		marginLeft: 10,
		fontSize: 13,
		color: "#B91C1C",
		lineHeight: 18,
	},

	errorRetry: {
		fontSize: 13,
		fontWeight: "600",
		color: "#0E693D",
		marginLeft: 8,
	},
});
