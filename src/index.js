import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/* Internationalization */
import { default as arabic } from "./i18n/arabic";
import { default as bahasa } from "./i18n/bahasa";
import { default as english } from "./i18n/english";

/* Main Structure */
import { Body } from "./components/structures/Body";
import { Header } from "./components/structures/Header";

/* Resources - Icons */
// prayerTimeList
import { ReactComponent as Notification } from "./images/notificationIcon.svg";
import { ReactComponent as NotificationDisable } from "./images/notificationDisableIcon.svg";
// locationSelector button
import { ReactComponent as LocationIcon } from "./images/icon-location.svg";
// header button setting
import { ReactComponent as SettingsIcon } from "./images/settingsIcon.svg";
// modal close icon
import { ReactComponent as CloseIcon } from "./images/closeIcon.svg";

/* Components */
import Credit from "./components/Credit";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import Checkbox from "./components/Checkbox";
import Tazkirah from "./components/Tazkirah/Tazkirah";
import DatePicker from "./components/DatePicker/DatePicker";
import ThemeSelector from "./components/ThemeSelector";
import PrayerTimeList from "./components/PrayerTimeList/PrayerTimeList";
import PrayerCountdown from "./components/PrayerCountdown/PrayerCountdown";
import LocationSelector from "./components/LocationSelector/LocationSelector";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";

export const i18n = { arabic, bahasa, english };
export { Header, Body };
export {
	Notification,
	NotificationDisable,
	LocationIcon,
	SettingsIcon,
	CloseIcon
};
export {
	Modal,
	Credit,
	Button,
	Checkbox,
	Tazkirah,
	DatePicker,
	ThemeSelector,
	PrayerTimeList,
	PrayerCountdown,
	LocationSelector,
	LanguageSelector
};
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
