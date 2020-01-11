import { useStateValue } from "../state";

export const useChangeUserSettings = () => {
	/*
	userSettings: {
		darkMode: true,
		showModal: false,
		minimalMode: false,
		selectedLang: "bahasa",
		enableNotification: false,
		showLoadingBar: false,
		changeLanguage: false
	},
	*/
	const [{ languages, userSettings }, dispatch] = useStateValue(),
		isDarkMode = userSettings.darkMode,
		showUserSettingsModal = userSettings.showModal,
		showLanguageModal = userSettings.showLanguageModal,
		isMinimal = userSettings.minimalMode,
		selectedLang = userSettings.selectedLang,
		isNotificationEnabled = userSettings.enableNotification,
		isLoadingBarShown = userSettings.showLoadingBar;
	// isLanguageChanged = userSettings.changeLanguage;

	function setDarkMode() {
		return setUserSettings("darkMode", !userSettings.darkMode);
	}
	function toggleUserSettingsModal() {
		// showUserSettingsModal
		// 	? (document.body.style.overflow = "auto")
		// 	: (document.body.style.overflow = "hidden");
		return setUserSettings("showModal", !showUserSettingsModal);
	}
	function toggleLanguageModal() {
		// showLanguageModal
		// 	? (document.body.style.overflow = "auto")
		// 	: (document.body.style.overflow = "hidden");
		return setUserSettings("showLanguageModal", !showLanguageModal);
	}
	function setMinimal() {
		return setUserSettings("minimalMode", !userSettings.minimalMode);
	}
	function setLang(lang) {
		return setUserSettings("selectedLang", lang);
	}
	function enableNotification() {
		return setUserSettings(
			"enableNotification",
			!userSettings.enableNotification
		);
	}
	// function changeLanguage() {
	// 	return setUserSettings("changeLanguage", !userSettings.changeLanguage);
	// }
	function setUserSettings(mode, val) {
		dispatch({
			type: "setUserSettings",
			mode: mode,
			value: val
		});
	}
	return {
		setUserSettings,
		isLoadingBarShown,
		// isLanguageChanged,
		// changeLanguage,
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
		toggleUserSettingsModal,
		showLanguageModal,
		toggleLanguageModal
	};
};
