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
		isLoadingBarShown = userSettings.showLoadingBar,
		isScrolling = userSettings.isScrolling;
	// isLanguageChanged = userSettings.changeLanguage;

	function checkIsScrolling(val) {
		setUserSettings("isScrolling", val);
	}
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
	function notifyMe() {
		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification");
		}

		// Let's check whether notification permissions have already been granted
		else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			var notification = new Notification("Hi there!");
		}

		// Otherwise, we need to ask the user for permission
		else if (
			Notification.permission !== "denied" &&
			!isNotificationEnabled
		) {
			Notification.requestPermission().then(function (permission) {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					var notification = new Notification("Hi there!");
				}
			});
		}
		// At last, if the user has denied notifications, and you
		// want to be respectful there is no need to bother them any more.
	}
	function enableNotification() {
		// notifyMe();
		return setUserSettings(
			"enableNotification",
			!userSettings.enableNotification
		);
	}
	// function setHeightVH() {
	// 	// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
	// 	let vh = window.innerHeight * 0.01;
	// 	// Then we set the value in the --vh custom property to the root of the document
	// 	document.documentElement.style.setProperty("--vh", `${vh}px`);

	// 	// We listen to the resize event
	// 	window.addEventListener("resize", () => {
	// 		// We execute the same script as before
	// 		let vh = window.innerHeight * 0.01;
	// 		document.documentElement.style.setProperty("--vh", `${vh}px`);
	// 	});
	// }

	// function changeLanguage() {
	// 	return setUserSettings("changeLanguage", !userSettings.changeLanguage);
	// }
	function setUserSettings(mode, val) {
		dispatch({
			type: "setUserSettings",
			mode: mode,
			value: val,
		});
	}
	return {
		setUserSettings,
		isLoadingBarShown,
		// isLanguageChanged,
		// changeLanguage,
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
		showLanguageModal,
		toggleLanguageModal,
	};
};
