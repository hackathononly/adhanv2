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
import { LocationIcon, SettingsIcon } from "../../index";
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
			getSelectedState
		} = useChangeLocationSettings(),
		{ hijriDate, serverTime, nextPrayer } = useSetPrayerTimes(),
		{ getTranslation: translate } = useGetTranslation();

	return (
		<header>
			<Button type="settings" isShowing={toggleUserSettingsModal}>
				<SettingsIcon />
			</Button>
			<Modal
				key={"userSettingsModal"}
				hide={toggleUserSettingsModal}
				isShowing={showUserSettingsModal}
			>
				{/*
				<ul>
					<li>
						{" "}
						<Checkbox
							id={"darkMode"}
							isSet={setDarkMode}
							isChecked={isDarkMode}
						/>
						<label htmlFor="darkMode">
							{translate.setDarkMode}
						</label>
					</li>
					<li>
						<Checkbox
							id={"minimalMode"}
							isSet={setMinimal}
							isChecked={isMinimal}
						/>
						<label htmlFor="minimalMode">
							{translate.setMinimal}
						</label>
					</li>
					<li>
						{" "}
						<Checkbox
							id={"notification"}
							isSet={enableNotification}
							isChecked={isNotificationEnabled}
						/>
						<label htmlFor="notification">
							{translate.enableNotification}
						</label>
					</li>
				</ul>
				*/}
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
				{/* <h3>{translate.changeLang}</h3> */}
				<span className={"spacer"}></span>
				<LanguageSelector
					langList={languages}
					setLang={setLang}
					selectedLang={selectedLang}
				/>
			</Modal>
			<PrayerCountdown timeToNextPrayer={12} nextPrayer={nextPrayer} />
			<Button type="locationSelector" isShowing={toggleLocationModal}>
				<LocationIcon />
				{getSelectedState}
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
