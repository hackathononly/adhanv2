import React, { useRef } from "react";
import {
	TickIcon,
	Button,
	// CloseIcon,
	SettingsIcon,
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
			// enableNotification,
			// isNotificationEnabled,
			showUserSettingsModal,
			// showLanguageModal,
			toggleUserSettingsModal,
			toggleLanguageModal
			// isLanguageChanged
		} = useChangeUserSettings(),
		{ hijriDate, serverTime } = useSetPrayerTimes();

	const settingsContainer = useRef(null);
	useOuterClickNotifier(settingsContainer, toggleUserSettingsModal);

	return (
		<aside key={"creditAside"}>
			<div key={"creditDiv"}>
				<DatePicker
					key={"datepickerCredit"}
					selectedLang={selectedLang}
					hijriDate={hijriDate}
					gregorianDate={serverTime}
				/>
				<section key={"creditSection"}>
					{/* <span title={translate.subcredit}>{translate.credit}</span> */}
					{/* {translate.credit} &nbsp;/ */}
					{/* <LanguageSelector
						key={"languageselectorCredit"}
						isShowing={showLanguageModal}
						// translate={translate}
						toggleLanguageModal={toggleLanguageModal}
						langList={languages}
						setLang={setLang}
						selectedLang={selectedLang}
					/>
					<Button
						key={"settings"}
						translate={translate}
						type="settings"
						isShowing={toggleLanguageModal}
					>
						{selectedLang}
					</Button> */}
					{/* <a
					href="/#"
					className={"settings"}
					onClick={toggleLanguageModal}
					title={translate.changeLang}
				>
					{selectedLang}
				</aside> */}
					{/* {" "} */}
					<Button
						key={"settings"}
						type="settings"
						title={translate.settings}
						isShowing={toggleUserSettingsModal}
					>
						{/* {translate.settings} */}
						<SettingsIcon />
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
							key={"settingsContainer"}
							ref={settingsContainer}
							className={"settingsContainer"}
							role="presentation"
						>
							<div
								key={"dialogCredit"}
								className="content"
								role="dialog"
							>
								<Checkbox
									id={"darkMode"}
									isSet={setDarkMode}
									isChecked={isDarkMode}
								/>
								<label
									key={"darkmodeCredit"}
									htmlFor="darkMode"
								>
									<TickIcon width="30" height="30" />
									{translate.setDarkMode}
								</label>
								<Checkbox
									id={"minimalMode"}
									isSet={setMinimal}
									isChecked={isMinimal}
								/>
								<label
									key={"minimalmodeCredit"}
									htmlFor="minimalMode"
								>
									<TickIcon width="30" height="30" />
									{translate.setMinimal}
								</label>
								{/* <Checkbox
								id={"notification"}
								isSet={enableNotification}
								isChecked={isNotificationEnabled}
							/>
							<label htmlFor="notification">
								<TickIcon width="30" height="30" />
								{translate.enableNotification}
							</label> */}
								{/* <Button
								key={"close"}
							type="close"
							isShowing={toggleUserSettingsModal}
						>
							<CloseIcon width="30" height="30" />
						</Button> */}
								<LanguageSelector
									key={"languageselectorCredit-1"}
									// isShowing={showLanguageModal}
									translate={translate}
									toggleLanguageModal={toggleLanguageModal}
									langList={languages}
									setLang={setLang}
									selectedLang={selectedLang}
								/>
							</div>
						</div>
					) : null}
				</section>
			</div>
			{/* <Button
				key={"settings"}
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
