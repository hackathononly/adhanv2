import React, { useRef } from "react";
import {
	TickIcon,
	Button,
	SettingsIcon,
	DatePicker,
	Checkbox,
	LanguageSelector,
} from "../index";
import { useOuterClickNotifier } from "../customHook/useGeneralHelper";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
import { useSetPrayerTimes } from "../customHook/useSetPrayerTimes";

const Credit = () => {
	const { getTranslation: translate } = useGetTranslation(),
		{
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
			toggleUserSettingsModal,
		} = useChangeUserSettings(),
		{ hijriDate, serverTime } = useSetPrayerTimes();

	const settingsContainer = useRef(null);
	useOuterClickNotifier(settingsContainer, toggleUserSettingsModal);

	return (
		<aside key={"creditAside"}>
			<Button
				key={"settings"}
				type={"settings"}
				showUserSettingsModal={showUserSettingsModal}
				title={translate.settings}
				isShowing={toggleUserSettingsModal}
			>
				<DatePicker
					key={"datepickerCredit"}
					selectedLang={selectedLang}
					hijriDate={hijriDate}
					gregorianDate={serverTime}
				/>
				<SettingsIcon />
			</Button>
			{showUserSettingsModal ? (
				<div
					key={"settingsContainer"}
					ref={settingsContainer}
					className={[
						showUserSettingsModal ? "settingsContainer" : null,
						"animate",
					].join(" ")}
					role="presentation"
				>
					<div key={"dialogCredit"} className="content" role="dialog">
						<Checkbox
							id={"darkMode"}
							isSet={setDarkMode}
							isChecked={isDarkMode}
						/>
						<label key={"darkmodeCredit"} htmlFor="darkMode">
							<TickIcon width="30" height="30" />
							{translate.setDarkMode}
						</label>
						<Checkbox
							id={"minimalMode"}
							isSet={setMinimal}
							isChecked={isMinimal}
						/>
						<label key={"minimalmodeCredit"} htmlFor="minimalMode">
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
						<LanguageSelector
							key={"languageselectorCredit"}
							translate={translate}
							langList={languages}
							setLang={setLang}
							selectedLang={selectedLang}
						/>
					</div>
				</div>
			) : null}
		</aside>
	);
};

export default Credit;
