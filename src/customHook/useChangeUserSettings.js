import { useStateValue } from "../state";

export const useChangeUserSettings = () => {
	const [{ languages, userSettings }, dispatch] = useStateValue(),
		showUserSettingsModal = userSettings.showModal,
		selectedLang = userSettings.selectedLang,
		isDarkMode = userSettings.darkMode,
		isMinimal = userSettings.minimalMode,
		isNotificationEnabled = userSettings.enableNotification;

	function enableNotification() {
		return setUserSettings(
			"enableNotification",
			!userSettings.enableNotification
		);
	}
	function toggleUserSettingsModal() {
		userSettings.showModal
			? (document.body.style.overflow = "auto")
			: (document.body.style.overflow = "hidden");
		return setUserSettings("showModal", !userSettings.showModal);
	}
	function setDarkMode() {
		return setUserSettings("darkMode", !userSettings.darkMode);
	}
	function setMinimal() {
		return setUserSettings("minimalMode", !userSettings.minimalMode);
	}
	function setLang(lang) {
		return setUserSettings("selectedLang", lang);
	}
	function setUserSettings(mode, val) {
		dispatch({
			type: "setUserSettings",
			mode: mode,
			value: val
		});
	}
	return {
		setUserSettings,
		isMinimal,
		setMinimal,
		isDarkMode,
		setDarkMode,
		languages,
		setLang,
		selectedLang,
		enableNotification,
		isNotificationEnabled,
		showUserSettingsModal,
		toggleUserSettingsModal
	};
};
