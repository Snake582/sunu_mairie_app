import React, { useRef, useState, useCallback } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	SafeAreaView,
	StatusBar,
	FlatList,
	Animated,
	type ListRenderItem,
	type NativeSyntheticEvent,
	type NativeScrollEvent,
} from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "~/components/ui/IconSymbol";

const { width, height } = Dimensions.get("window");

const BRAND_GREEN = "#00853F";
const BRAND_AMBER = "#F59E0B";
const TITLE_COLOR = "#111827";
const SUBTITLE_COLOR = "#6B7280";
const INACTIVE_DOT = "#E5E7EB";

interface Page {
	id: string;
	illustration: React.ReactNode;
	title: string;
	subtitle: string;
}

export default function OnboardingScreen() {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const listRef = useRef<FlatList<Page>>(null);

	const goToLogin = useCallback(() => {
		router.replace("/login");
	}, [router]);

	const handleNext = useCallback(() => {
		if (currentIndex === PAGES.length - 1) {
			goToLogin();
			return;
		}
		const nextIndex = currentIndex + 1;
		listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
		setCurrentIndex(nextIndex);
	}, [currentIndex, goToLogin]);

	const onScroll = Animated.event(
		[{ nativeEvent: { contentOffset: { x: scrollX } } }],
		{ useNativeDriver: false },
	);

	const onMomentumScrollEnd = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			const index = Math.round(event.nativeEvent.contentOffset.x / width);
			setCurrentIndex(index);
		},
		[],
	);

	const renderItem: ListRenderItem<Page> = useCallback(
		({ item }) => (
			<View style={[styles.page, { width }]}>
				<View style={styles.illustration}>{item.illustration}</View>
				<View style={styles.textContent}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.subtitle}>{item.subtitle}</Text>
				</View>
			</View>
		),
		[],
	);

	const isLast = currentIndex === PAGES.length - 1;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.7} onPress={goToLogin}>
					<Text style={styles.skipText}>Passer</Text>
				</TouchableOpacity>
			</View>

			<Animated.FlatList
				ref={listRef}
				data={PAGES}
				keyExtractor={(item) => item.id}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				bounces={false}
				renderItem={renderItem}
				onScroll={onScroll}
				onMomentumScrollEnd={onMomentumScrollEnd}
				scrollEventThrottle={16}
				getItemLayout={(_data, index) => ({
					length: width,
					offset: width * index,
					index,
				})}
			/>

			<View style={styles.footer}>
				<View style={styles.dots}>
					{PAGES.map((page, index) => {
						const inputRange = [
							(index - 1) * width,
							index * width,
							(index + 1) * width,
						];
						const dotWidth = scrollX.interpolate({
							inputRange,
							outputRange: [8, 24, 8],
							extrapolate: "clamp",
						});
						const dotColor = scrollX.interpolate({
							inputRange,
							outputRange: [INACTIVE_DOT, BRAND_GREEN, INACTIVE_DOT],
							extrapolate: "clamp",
						});

						return (
							<Animated.View
								key={page.id}
								style={[
									styles.dot,
									{ width: dotWidth, backgroundColor: dotColor },
								]}
							/>
						);
					})}
				</View>

				<TouchableOpacity
					activeOpacity={0.85}
					style={[
						styles.button,
						{ backgroundColor: isLast ? BRAND_AMBER : BRAND_GREEN },
					]}
					onPress={handleNext}
				>
					<Text style={styles.buttonText}>
						{isLast ? "Commencer" : "Suivant"}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},

	header: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 12,
		paddingBottom: 8,
		height: 56,
	},

	skipText: {
		color: SUBTITLE_COLOR,
		fontSize: 16,
		fontWeight: "600",
	},

	page: {
		flex: 1,
		paddingHorizontal: 32,
		paddingBottom: 24,
	},

	illustration: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		minHeight: height * 0.35,
	},

	logo: {
		width: 260,
		height: 260,
	},

	textContent: {
		alignItems: "center",
		marginBottom: 32,
	},

	title: {
		color: TITLE_COLOR,
		fontSize: 30,
		fontWeight: "800",
		textAlign: "center",
		marginBottom: 16,
		letterSpacing: -0.6,
	},

	subtitle: {
		color: SUBTITLE_COLOR,
		fontSize: 16,
		fontWeight: "400",
		textAlign: "center",
		lineHeight: 25,
		maxWidth: 320,
	},

	footer: {
		paddingHorizontal: 24,
		paddingBottom: 24,
		paddingTop: 8,
	},

	dots: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 24,
	},

	dot: {
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},

	button: {
		paddingVertical: 16,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 4,
	},

	buttonText: {
		color: "#FFFFFF",
		fontSize: 17,
		fontWeight: "700",
	},
});

const PAGES: Page[] = [
	{
		id: "welcome",
		illustration: (
			<Image
				source={require("~/assets/logo-removebg-preview.png")}
				style={styles.logo}
				resizeMode="contain"
			/>
		),
		title: "Bienvenue sur Sunu Mairie",
		subtitle:
			"Tous les services municipaux accessibles en quelques clics, partout et à tout moment.",
	},
	{
		id: "documents",
		illustration: (
			<IconSymbol name="document-text-outline" size={130} color={BRAND_GREEN} />
		),
		title: "Documents Administratifs",
		subtitle:
			"Demandez vos actes et certificats sans déplacement et recevez des notifications en temps réel.",
	},
	{
		id: "reports",
		illustration: <IconSymbol name="camera-outline" size={130} color={BRAND_GREEN} />,
		title: "Signalements Citoyens",
		subtitle:
			"Photographiez un problème dans votre commune et suivez sa résolution étape par étape.",
	},
];
