import { SymbolView, type SymbolWeight } from "expo-symbols";
import type { StyleProp, ViewStyle } from "react-native";

export type IconSymbolName = keyof typeof MAPPING;

/**
 * Cross-platform mapping from shared icon names to platform-specific symbol objects.
 * iOS uses native SF Symbols; Android renders matching Material Symbols via expo-symbols.
 */
const MAPPING = {
	// Tab bar
	home: { ios: "house.fill" as const, android: "home" as const },
	"document-text": { ios: "doc.text" as const, android: "description" as const },
	notifications: { ios: "bell" as const, android: "notifications" as const },
	person: { ios: "person" as const, android: "person" as const },

	// Onboarding
	"document-text-outline": { ios: "doc.text" as const, android: "description" as const },
	"camera-outline": { ios: "camera" as const, android: "photo_camera" as const },

	// Home services
	description: { ios: "doc.text" as const, android: "description" as const },
	report: { ios: "exclamationmark.triangle" as const, android: "report" as const },
	favorite: { ios: "heart" as const, android: "favorite" as const },
	article: { ios: "newspaper" as const, android: "article" as const },
	place: { ios: "mappin" as const, android: "place" as const },

	// Requests status
	schedule: { ios: "clock" as const, android: "schedule" as const },
	"check-circle": { ios: "checkmark.circle" as const, android: "check_circle" as const },
	inventory: { ios: "archivebox" as const, android: "inventory_2" as const },
	"notifications-active": { ios: "bell.badge" as const, android: "notifications_active" as const },

	// Common UI
	badge: { ios: "person.text.rectangle" as const, android: "badge" as const },
	"camera-alt": { ios: "camera" as const, android: "photo_camera" as const },
	campaign: { ios: "megaphone" as const, android: "campaign" as const },
	chat: { ios: "bubble.left" as const, android: "chat" as const },
	"chevron-right": { ios: "chevron.right" as const, android: "chevron_right" as const },
	"dark-mode": { ios: "moon" as const, android: "dark_mode" as const },
	"done-all": { ios: "checkmark.circle" as const, android: "done_all" as const },
	edit: { ios: "pencil" as const, android: "edit" as const },
	email: { ios: "envelope" as const, android: "email" as const },
	"folder-open": { ios: "folder" as const, android: "folder_open" as const },
	info: { ios: "info.circle" as const, android: "info" as const },
	"location-on": { ios: "mappin.circle" as const, android: "location_on" as const },
	lock: { ios: "lock" as const, android: "lock" as const },
	logout: { ios: "arrow.right.square" as const, android: "logout" as const },
	"my-location": { ios: "location" as const, android: "my_location" as const },
	"photo-camera": { ios: "camera" as const, android: "photo_camera" as const },
	"privacy-tip": { ios: "hand.raised" as const, android: "privacy_tip" as const },
	save: { ios: "checkmark" as const, android: "save" as const },
	send: { ios: "paperplane" as const, android: "send" as const },
	settings: { ios: "gear" as const, android: "settings" as const },
	"support-agent": { ios: "headphones" as const, android: "support_agent" as const },
	"upload-file": { ios: "arrow.up.doc" as const, android: "upload_file" as const },
	cancel: { ios: "xmark.circle" as const, android: "cancel" as const },
	help: { ios: "questionmark.circle" as const, android: "help" as const },
	phone: { ios: "phone" as const, android: "phone" as const },
} as const;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Symbols on Android.
 */
export function IconSymbol({
	name,
	size = 24,
	color,
	style,
	weight = "regular",
}: {
	name: IconSymbolName;
	size?: number;
	color: string;
	style?: StyleProp<ViewStyle>;
	weight?: SymbolWeight;
}) {
	return (
		<SymbolView
			name={MAPPING[name]}
			size={size}
			tintColor={color}
			weight={weight}
			resizeMode="scaleAspectFit"
			style={[
				{
					width: size,
					height: size,
				},
				style,
			]}
		/>
	);
}
