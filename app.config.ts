import type { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
	if (IS_DEV) {
		return "com.xarala.sunumairie.dev";
	}

	if (IS_PREVIEW) {
		return "com.xarala.sunumairie.preview";
	}

	return "com.xarala.sunumairie";
};

const getAppName = () => {
	if (IS_DEV) {
		return "Sunu Mairie (Dev)";
	}

	if (IS_PREVIEW) {
		return "Sunu Mairie (Preview)";
	}

	return "Sunu Mairie";
};
export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: getAppName(),
	slug: "sunu-mairie",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.jpeg",
	userInterfaceStyle: "light",
	newArchEnabled: false,
	ios: {
		supportsTablet: true,
		bundleIdentifier: getUniqueIdentifier(),
		config: {
			usesNonExemptEncryption: false,
		},
		icon: {
			dark: "./assets/icons/ios-icon-dark.png",
			light: "./assets/icons/ios-icon-default.png",
			tinted: "./assets/icons/ios-icon-monochrome.png",
		},
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/icons/android-icon-foreground.png",
			monochromeImage: "./assets/icons/android-icon-monochrome.png",
			backgroundColor: "#FFFFFF",
		},
		package: getUniqueIdentifier(),
	},
	web: {
		favicon: "./assets/favicon.png",
	},
	plugins: [
		[
			"expo-splash-screen",
			{
				backgroundColor: "#FFFFFF",
				ios: {
					image: "./assets/icons/iOS.png",
				},
				android: {
					image: "./assets/icons/android-splash.png",
				},
				imageWidth: 200,
			},
		],
	],
	extra: {
		eas: {
			projectId: "8b2293b7-c0d7-46c1-a303-dbe4f2b068db",
		},
	},
});
