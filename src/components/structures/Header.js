import React, { useRef } from "react";
import {
	Credit,
	Modal,
	Button,
	// Checkbox,
	// DatePicker,
	PrayerCountdown,
	LocationSelector,
	// LanguageSelector
} from "../../index";
import {
	LocationIcon,
	// SettingsIcon
} from "../../index";
import {
	useScrollNotifier,
	useOuterClickNotifier,
	// , useComponentIntoView
} from "../../customHook/useGeneralHelper";
import { useGetTranslation } from "../../customHook/useGetTranslation";
import { useSetPrayerTimes } from "../../customHook/useSetPrayerTimes";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";
import { useChangeLocationSettings } from "../../customHook/useChangeLocationSettings";

export const Header = () => {
	const {
			// 		// languages,
			// 		// setLang,
			// selectedLang,
			// 		changeLanguage,
			// 		isLanguageChanged,
			isScrolling,
			checkIsScrolling,
			// handleScroll,
			// isMinimal
			// 		setMinimal,
			// 		isDarkMode,
			// 		setDarkMode,
			// 		enableNotification,
			// 		isNotificationEnabled,
			// 		showUserSettingsModal,
			// 		toggleUserSettingsModal
		} = useChangeUserSettings(),
		{
			locations,
			locationSettings,
			setStateName,
			setStateCode,
			showLocationModal,
			toggleLocationModal,
			getSelectedState,
			// getSelectedStateCode,
			getSelectedMunicipal,
		} = useChangeLocationSettings(),
		{
			// hijriDate,
			// serverTime,
			nextPrayer,
			timeToNextPrayer,
		} = useSetPrayerTimes(),
		{ getTranslation: translate } = useGetTranslation();

	const locationSettingsModal = useRef(null);
	useOuterClickNotifier(locationSettingsModal, toggleLocationModal);

	const header = useRef(null);
	useScrollNotifier(header, checkIsScrolling);

	return (
		<header>
			{/* <Credit key={"creditHeader"} /> */}
			{/* <DatePicker
				key={"datepickerCredit"}
				selectedLang={selectedLang}
				hijriDate={hijriDate}
				gregorianDate={serverTime}
			/> */}
			<div className="content">
				{/* <div className="subcontent"> */}
				<div
					className={[
						isScrolling ? "itemScroll" : null,
						"subcontent",
					].join(" ")}
				>
					{/* <Button key={"settings"} type="settings" isShowing={toggleUserSettingsModal}>
				<SettingsIcon />
			</Button> */}
					{/* <Modal
				key={"userSettingsModal"}
				hide={toggleUserSettingsModal}
				isShowing={showUserSettingsModal}
			>
				<div className={"settingsContainer"}>
					<h3>{translate.settings}</h3>
					<hr />
					<label htmlFor="darkMode">
						<Checkbox
							id={"darkMode"}
							isSet={setDarkMode}
							isChecked={isDarkMode}
						/>
						{translate.setDarkMode}
					</label>
					<hr />
					<label htmlFor="minimalMode">
						<Checkbox
							id={"minimalMode"}
							isSet={setMinimal}
							isChecked={isMinimal}
						/>
						{translate.setMinimal}
					</label>
					<hr />
					<label htmlFor="notification">
						<Checkbox
							id={"notification"}
							isSet={enableNotification}
							isChecked={isNotificationEnabled}
						/>
						{translate.enableNotification}
					</label> */}
					{/* <hr />
					<label htmlFor="changeLanguage">
						<Checkbox
							id={"changeLanguage"}
							isSet={changeLanguage}
							isChecked={isLanguageChanged}
						/>
						{translate.changeLang}
					</label> */}
					{/* <hr />
					<h3>{translate.changeLang}</h3>
					<hr /> */}
					{/* <LanguageSelector
					key={"languageselectorHeader"}
					langList={languages}
					setLang={setLang}
					selectedLang={selectedLang}
				/> */}
					{/* </div>
			</Modal> */}
					<PrayerCountdown
						key={"prayercountdownHeader"}
						translate={translate}
						timeToNextPrayer={timeToNextPrayer}
						nextPrayer={nextPrayer}
					/>
					<Button
						key={"locationSelector"}
						type="locationSelector"
						title={translate.locationSelector}
						isShowing={toggleLocationModal}
					>
						{/* <LocationIcon /> */}
						{/* {getSelectedState} */}
						{/* <span>{getSelectedStateCode || getSelectedState}</span> */}
						<span>{getSelectedMunicipal || getSelectedState}</span>
					</Button>
					<Credit key={"creditHeader"} />
					<Modal
						key={"modalHeader"}
						translate={translate}
						reference={locationSettingsModal}
						hide={toggleLocationModal}
						isShowing={showLocationModal}
					>
						{/* <div className={"settingsContainer"}>
					<h3>
						<span>
							{translate.locationSelector}
							{locationSettings.selectedState
								? " : " + locationSettings.selectedState
								: null}
							{locationSettings.selectedMunicipal
								? " > " + locationSettings.selectedMunicipal
								: null}
						</span>
					</h3>
					<hr />
				</div> */}
						<h3 className={"locationSelectorTitle"}>
							{translate.locationSelector}
						</h3>
						<LocationSelector
							key={"locationselectorHeader"}
							translate={translate}
							locations={locations}
							locationSettings={locationSettings}
							setStateName={setStateName}
							setStateCode={setStateCode}
						/>
					</Modal>
					{/* <DatePicker
					key={"datepickerHeader"}
					isShowing={isMinimal}
					selectedLang={selectedLang}
					hijriDate={hijriDate}
					gregorianDate={serverTime}
				/> */}
				</div>
			</div>
		</header>
	);
};
