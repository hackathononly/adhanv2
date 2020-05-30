import { useStateValue } from "../state";
import { useAdhanAppDB } from "../customHook/useAdhanAppDB";

export const useChangeUserSettings = () => {
	const [{ languages, userSettings }, dispatch] = useStateValue(),
		isDarkMode = userSettings.darkMode,
		showUserSettingsModal = userSettings.showModal,
		// showLanguageModal = userSettings.showLanguageModal,
		isMinimal = userSettings.minimalMode,
		selectedLang = userSettings.selectedLang,
		isNotificationEnabled = userSettings.enableNotification,
		isLoadingBarShown = userSettings.showLoadingBar,
		isScrolling = userSettings.isScrolling;
	// isLanguageChanged = userSettings.changeLanguage;
	const {
		// addToStore,
		getRecordByKey,
		updateRecord,
	} = useAdhanAppDB();

	function checkIsScrolling(val) {
		setUserSettings({ isScrolling: val });
	}
	function setDarkMode() {
		// setLocalStorage("userSettings", "darkMode", !userSettings.darkMode);
		setUserSettings({ darkMode: !userSettings.darkMode });
	}
	function toggleUserSettingsModal() {
		// showUserSettingsModal
		// 	? (document.body.style.overflow = "auto")
		// 	: (document.body.style.overflow = "hidden");

		// setUserSettings("showModal", !showUserSettingsModal);
		setUserSettings({ showModal: !showUserSettingsModal });
	}
	// function toggleLanguageModal() {
	// showLanguageModal
	// 	? (document.body.style.overflow = "auto")
	// 	: (document.body.style.overflow = "hidden");
	// return setUserSettings("showLanguageModal", !showLanguageModal);
	// }
	function setMinimal() {
		// setLocalStorage(
		// 	"userSettings",
		// 	"minimalMode",
		// 	!userSettings.minimalMode
		// );
		// setUserSettings("minimalMode", !userSettings.minimalMode);
		setUserSettings({ minimalMode: !userSettings.minimalMode });
	}
	function setLang(lang) {
		// !@ save to localStorage
		// setLocalStorage("userSettings", "selectedLang", selectedLang);
		// setUserSettings("selectedLang", lang);
		setUserSettings({ selectedLang: lang });
	}
	/* 	function notifyMe() {
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
	} */
	function enableNotification() {
		// notifyMe();
		// setLocalStorage(
		// 	"userSettings",
		// 	"enableNotification",
		// 	!userSettings.enableNotification
		// );
		// setUserSettings("enableNotification", !userSettings.enableNotification);
		setUserSettings({
			enableNotification: !userSettings.enableNotification,
		});
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
	// function setLocalStorage(key, path, val) {
	// 	const item = JSON.parse(localStorage[key]),
	// 		itemValue = { ...item, [path]: val };
	// 	localStorage.setItem(key, JSON.stringify(itemValue));
	// }
	async function setUserSettings(setting) {
		const userSettingsRecord = await getRecordByKey("settings", "user");
		console.log(userSettingsRecord, setting);
		updateRecord("user", setting);

		// const userSettingsRecord = async () => {
		// 	return await getRecordByKey("settings", "user");
		// };
		// userSettingsRecord().then(function (response) {
		// 	console.log(response);
		// });

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
		// showLanguageModal,
		// toggleLanguageModal,
	};
};
