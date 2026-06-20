import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	ScrollView,
	ActivityIndicator,
	Image,
	StyleSheet,
} from "react-native";
import { IconSymbol } from "~/components/ui/IconSymbol";

export default function EditProfileScreen() {
	const router = useRouter();
	const { user: userParam } = useLocalSearchParams<{ user: string }>();
	const user = userParam ? JSON.parse(userParam) : null;

	const [photo, setPhoto] = useState(user?.photo || "");
	const [fullName, setFullName] = useState(user?.fullName || "");
	const [phone, setPhone] = useState(user?.phone || "");
	const [adresse, setAdresse] = useState(user?.adresse || "");
	const [loading, setLoading] = useState(false);

	const uploadImage = async () => {
		const formData = new FormData();

		formData.append("photo", {
			uri: photo,
			name: "profile.jpg",
			type: "image/jpeg",
		} as any);

		const API_URL = process.env.EXPO_PUBLIC_API_URL;
		const response = await fetch(`${API_URL}/users/upload`, {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Erreur lors de l'upload de la photo");
		}

		return await response.json();
	};

	const pickImage = async () => {
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permission.granted) {
			Alert.alert("Permission refusée", "Veuillez autoriser l'accès à la galerie");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.8,
		});

		if (!result.canceled) {
			setPhoto(result.assets[0].uri);
		}
	};

	const updateProfile = async () => {
		try {
			if (!user?.id) {
				Alert.alert("Erreur", "Aucun utilisateur à modifier");
				return;
			}

			setLoading(true);

			let imageUrl = user?.photo;

			if (photo && !photo.startsWith("http")) {
				const uploadResult = await uploadImage();
				imageUrl = uploadResult.imageUrl;
			}

			const API_URL = process.env.EXPO_PUBLIC_API_URL;
			const response = await fetch(`${API_URL}/users/${user.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullName,
					phone,
					adresse,
					photo: imageUrl,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Erreur lors de la mise à jour");
			}

			Alert.alert("Succès", "Profil mis à jour avec succès");

			router.back();
		} catch (error: any) {
			Alert.alert("Erreur", error.message || "Impossible de mettre à jour le profil");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<TouchableOpacity onPress={pickImage} style={{ alignItems: "center", marginBottom: 20 }}>
					<Image
						source={{
							uri: photo || "https://via.placeholder.com/150",
						}}
						style={{
							width: 120,
							height: 120,
							borderRadius: 60,
							borderWidth: 4,
							borderColor: "#FFF",
						}}
					/>

					<View
						style={{
							position: "absolute",
							bottom: 0,
							right: 10,
							backgroundColor: "#FFF",
							borderRadius: 20,
							padding: 5,
						}}
					>
						<IconSymbol name="camera-alt" size={20} color="#0E693D" />
					</View>

					<Text style={{ color: "#FFF", marginTop: 10, fontWeight: "600" }}>
						Modifier la photo
					</Text>
				</TouchableOpacity>

				<Text style={styles.title}>Modifier le profil</Text>

				<Text style={styles.subtitle}>Mettez à jour vos informations</Text>
			</View>

			<View style={styles.form}>
				<Text style={styles.label}>Nom complet</Text>

				<TextInput
					style={styles.input}
					value={fullName}
					onChangeText={setFullName}
					placeholder="Nom complet"
				/>

				<Text style={styles.label}>Téléphone</Text>

				<TextInput
					style={styles.input}
					value={phone}
					onChangeText={setPhone}
					keyboardType="phone-pad"
					placeholder="Téléphone"
				/>

				<Text style={styles.label}>Adresse</Text>

				<TextInput
					style={styles.input}
					value={adresse}
					onChangeText={setAdresse}
					placeholder="Adresse"
					multiline
				/>

				<TouchableOpacity style={styles.button} onPress={updateProfile} disabled={loading}>
					{loading ? (
						<ActivityIndicator color="#FFF" />
					) : (
						<>
							<IconSymbol name="save" size={20} color="#FFF" />

							<Text style={styles.buttonText}>Enregistrer</Text>
						</>
					)}
				</TouchableOpacity>
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
		paddingTop: 70,
		paddingBottom: 40,
		alignItems: "center",
		borderBottomLeftRadius: 35,
		borderBottomRightRadius: 35,
	},

	title: {
		marginTop: 10,
		fontSize: 24,
		fontWeight: "700",
		color: "#FFF",
	},

	subtitle: {
		marginTop: 5,
		color: "#D1FAE5",
		fontSize: 14,
	},

	form: {
		padding: 20,
	},

	label: {
		marginBottom: 8,
		fontWeight: "600",
		color: "#334155",
	},

	input: {
		backgroundColor: "#FFF",
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#E2E8F0",
		paddingHorizontal: 16,
		paddingVertical: 15,
		marginBottom: 18,
		fontSize: 15,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.03,
		shadowRadius: 4,

		elevation: 2,
	},

	button: {
		backgroundColor: "#0E693D",
		height: 58,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginTop: 10,

		shadowColor: "#0E693D",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 6,

		elevation: 5,
	},

	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "700",
		marginLeft: 8,
	},
});
