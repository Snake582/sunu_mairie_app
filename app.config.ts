import type { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
	if (IS_DEV) {
		return "com.xarala.sunu-mairie.dev";
	}

	if (IS_PREVIEW) {
		return "com.xarala.sunu-mairie.preview";
	}

	return "com.xarala.sunu-mairie";
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
    "name": getAppName(),
    "slug": "sunu-mairie",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.jpeg",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "201544b1-2016-4f6f-a923-22e97a78b579"
      }
    }
  })