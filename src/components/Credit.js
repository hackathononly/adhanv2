import React, { useRef } from "react";
import {
	TickIcon,
	// Button,
	// CloseIcon,
	// SettingsIcon,
	// DatePicker,
	Checkbox,
	LanguageSelector
} from "../index";
import { useOuterClickNotifier } from "../helper";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
// import { useSetPrayerTimes } from "../customHook/useSetPrayerTimes";

const Credit = () => {
	const { getTranslation: translate } = useGetTranslation(),
		{
			languages,
			setLang,
			selectedLang,
			// changeLanguage,
			isMinimal,
			setMinimal,
			isDarkMode,
			setDarkMode,
			enableNotification,
			isNotificationEnabled,
			showUserSettingsModal,
			showLanguageModal,
			toggleUserSettingsModal,
			toggleLanguageModal
			// isLanguageChanged
		} = useChangeUserSettings();
	// { hijriDate, serverTime } = useSetPrayerTimes();

	const innerRef = useRef(null);
	useOuterClickNotifier(innerRef, toggleUserSettingsModal);

	return (
		<footer>
			{/* <span title={translate.subcredit}> */}
			<div>
				{translate.credit} &nbsp;/
				{/* <DatePicker hijriDate={hijriDate} gregorianDate={serverTime} /> */}
				<a
					href="/#"
					className={"settings"}
					onClick={toggleLanguageModal}
					title={translate.changeLang}
				>
					{selectedLang}
				</a>{" "}
				&nbsp;/
				<LanguageSelector
					isShowing={showLanguageModal}
					toggleLanguageModal={toggleLanguageModal}
					langList={languages}
					setLang={setLang}
					selectedLang={selectedLang}
				/>
				<a
					href="/#"
					className={"settings"}
					onClick={toggleUserSettingsModal}
				>
					{translate.settings}
				</a>
				{showUserSettingsModal ? (
					<div ref={innerRef} className={"settingsContainer"}>
						<Checkbox
							id={"darkMode"}
							isSet={setDarkMode}
							isChecked={isDarkMode}
						/>
						<label htmlFor="darkMode">
							<TickIcon width="30" height="30" />
							{translate.setDarkMode}
						</label>
						<Checkbox
							id={"minimalMode"}
							isSet={setMinimal}
							isChecked={isMinimal}
						/>
						<label htmlFor="minimalMode">
							<TickIcon width="30" height="30" />
							{translate.setMinimal}
						</label>
						<Checkbox
							id={"notification"}
							isSet={enableNotification}
							isChecked={isNotificationEnabled}
						/>
						<label htmlFor="notification">
							<TickIcon width="30" height="30" />
							{translate.enableNotification}
						</label>
						{/* <Button
							type="close"
							isShowing={toggleUserSettingsModal}
						>
							<CloseIcon width="30" height="30" />
						</Button> */}
					</div>
				) : null}
			</div>
			{/* <Button
				type="settings"
				title={translate.settings}
				isShowing={toggleUserSettingsModal}
			>
				<SettingsIcon />
			</Button> */}
		</footer>
	);
};

export default Credit;
