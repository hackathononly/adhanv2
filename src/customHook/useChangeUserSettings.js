// import { useEffect, useState } from "react";
import { useStateValue } from "../state";
import { useAdhanAppDB } from "../customHook/useAdhanAppDB";

export const useChangeUserSettings = () => {
	const [{ languages, userSettings }, dispatch] = useStateValue(),
		{ updateRecord } = useAdhanAppDB();

	const isDarkMode = userSettings.darkMode,
		isNotificationEnabled = userSettings.enableNotification,
		isScrolling = userSettings.isScrolling,
		isMinimal = userSettings.minimalMode,
		selectedLang = userSettings.selectedLang,
		isLoadingBarShown = userSettings.showLoadingBar,
		showUserSettingsModal = userSettings.showModal;

	function checkIsScrolling(val) {
		setUserSettings({ isScrolling: val });
	}
	function setDarkMode() {
		setUserSettings({ darkMode: !userSettings.darkMode });
	}
	function toggleUserSettingsModal() {
		setUserSettings({ showModal: !showUserSettingsModal });
	}
	function setMinimal() {
		setUserSettings({ minimalMode: !userSettings.minimalMode });
	}
	function setLang(lang) {
		setUserSettings({ selectedLang: lang });
	}
	function enableNotification() {
		setUserSettings({
			enableNotification: !userSettings.enableNotification,
		});
	}
	async function setUserSettings(setting) {
		updateRecord("user", setting);
		Object.keys(setting).map((key) => {
			return dispatch({
				type: "setUserSettings",
				mode: key,
				value: setting[key],
			});
		});
	}

	return {
		setUserSettings,
		isLoadingBarShown,
		isScrolling,
		checkIsScrolling,
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
	};
};
