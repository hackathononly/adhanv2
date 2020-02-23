import React, { useRef } from "react";
import {
	TickIcon,
	Button,
	// CloseIcon,
	// SettingsIcon,
	DatePicker,
	Checkbox,
	LanguageSelector
} from "../index";
import { useOuterClickNotifier } from "../customHook/useGeneralHelper";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
// import Button from "./Button/Button";
import { useSetPrayerTimes } from "../customHook/useSetPrayerTimes";

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
		} = useChangeUserSettings(),
		{ hijriDate, serverTime } = useSetPrayerTimes();

	const settingsContainer = useRef(null);
	useOuterClickNotifier(settingsContainer, toggleUserSettingsModal);

	return (
		<aside>
			<div>
				<DatePicker hijriDate={hijriDate} gregorianDate={serverTime} />
				<section>
					{/* <span title={translate.subcredit}>{translate.credit}</span> */}
					{/* {translate.credit} &nbsp;/ */}
					<LanguageSelector
						isShowing={showLanguageModal}
						// translate={translate}
						toggleLanguageModal={toggleLanguageModal}
						langList={languages}
						setLang={setLang}
						selectedLang={selectedLang}
					/>
					<Button
						translate={translate}
						type="settings"
						isShowing={toggleLanguageModal}
					>
						{selectedLang}
					</Button>
					{/* <a
					href="/#"
					className={"settings"}
					onClick={toggleLanguageModal}
					title={translate.changeLang}
				>
					{selectedLang}
				</aside> */}{" "}
					&nbsp;/
					<Button type="settings" isShowing={toggleUserSettingsModal}>
						{translate.settings}
					</Button>
					{/* <a
					href="/#"
					className={"settings"}
					onClick={toggleUserSettingsModal}
				>
					{translate.settings}
				</a> */}
					{showUserSettingsModal ? (
						<div
							ref={settingsContainer}
							className={"settingsContainer"}
						>
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
							<LanguageSelector
								isShowing={showLanguageModal}
								// translate={translate}
								toggleLanguageModal={toggleLanguageModal}
								langList={languages}
								setLang={setLang}
								selectedLang={selectedLang}
							/>
						</div>
					) : null}
				</section>
			</div>
			{/* <Button
				type="settings"
				title={translate.settings}
				isShowing={toggleUserSettingsModal}
			>
				<SettingsIcon />
			</Button> */}
		</aside>
	);
};

export default Credit;
