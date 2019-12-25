import React from "react";
import {
	Modal,
	Button,
	Checkbox,
	DatePicker,
	PrayerCountdown,
	LocationSelector,
	LanguageSelector
} from "../../index";
import {
	LocationIcon
	// SettingsIcon
} from "../../index";
import { useGetTranslation } from "../../customHook/useGetTranslation";
import { useSetPrayerTimes } from "../../customHook/useSetPrayerTimes";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";
import { useChangeLocationSettings } from "../../customHook/useChangeLocationSettings";

export const Header = () => {
	const {
			languages,
			setLang,
			selectedLang,
			isMinimal,
			setMinimal,
			isDarkMode,
			setDarkMode,
			enableNotification,
			isNotificationEnabled,
			showUserSettingsModal,
			toggleUserSettingsModal
		} = useChangeUserSettings(),
		{
			locations,
			locationSettings,
			setStateName,
			setStateCode,
			showLocationModal,
			toggleLocationModal,
			getSelectedState,
			getSelectedStateCode
		} = useChangeLocationSettings(),
		{
			hijriDate,
			serverTime,
			nextPrayer,
			timeToNextPrayer
		} = useSetPrayerTimes(),
		{ getTranslation: translate } = useGetTranslation();

	return (
		<header>
			{/* <Button type="settings" isShowing={toggleUserSettingsModal}>
				<SettingsIcon />
			</Button> */}
			<Modal
				key={"userSettingsModal"}
				hide={toggleUserSettingsModal}
				isShowing={showUserSettingsModal}
			>
				<div className={"settingsContainer"}>
					<h3>{translate.settings}</h3>
					<hr />
					<Checkbox
						id={"darkMode"}
						isSet={setDarkMode}
						isChecked={isDarkMode}
					/>
					<label htmlFor="darkMode">{translate.setDarkMode}</label>
					<hr />
					<Checkbox
						id={"minimalMode"}
						isSet={setMinimal}
						isChecked={isMinimal}
					/>
					<label htmlFor="minimalMode">{translate.setMinimal}</label>
					<hr />
					<Checkbox
						id={"notification"}
						isSet={enableNotification}
						isChecked={isNotificationEnabled}
					/>
					<label htmlFor="notification">
						{translate.enableNotification}
					</label>
					<hr />
					<h3>{translate.changeLang}</h3>
					<hr />
					<LanguageSelector
						langList={languages}
						setLang={setLang}
						selectedLang={selectedLang}
					/>
				</div>
			</Modal>
			<PrayerCountdown
				timeToNextPrayer={timeToNextPrayer}
				nextPrayer={nextPrayer}
			/>
			<Button type="locationSelector" isShowing={toggleLocationModal}>
				<LocationIcon />
				{getSelectedState}
				<span>{getSelectedStateCode}</span>
			</Button>
			<Modal
				key={"locationSettingsModal"}
				hide={toggleLocationModal}
				isShowing={showLocationModal}
			>
				<LocationSelector
					locations={locations}
					locationSettings={locationSettings}
					setStateName={setStateName}
					setStateCode={setStateCode}
				/>
			</Modal>
			<DatePicker hijriDate={hijriDate} gregorianDate={serverTime} />
		</header>
	);
};
