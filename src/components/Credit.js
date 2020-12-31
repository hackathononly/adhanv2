import React, { useRef } from "react";
import {
	TickIcon,
	Button,
	Footer,
	// SettingsIcon,
	// DatePicker,
	Checkbox,
	LanguageSelector,
} from "../index";
import { useOuterClickNotifier } from "../customHook/useGeneralHelper";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";
// import { useSetPrayerTimes } from "../customHook/useSetPrayerTimes";

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
			// showSelectLangModal,
			toggleSelectLangModal
		} = useChangeUserSettings();
	// { hijriDate, serverTime } = useSetPrayerTimes();

	const settingsContainer = useRef(null), langContainer = useRef(null);
	useOuterClickNotifier(settingsContainer, toggleUserSettingsModal);
	useOuterClickNotifier(langContainer, toggleSelectLangModal);
	return (
		<aside key={"creditAside"}>
			{/* <DatePicker
				key={"datepickerCredit"}
				selectedLang={selectedLang}
				hijriDate={hijriDate}
				gregorianDate={serverTime}
			/> */}
			<div className={"buttonContainer"}>
				{/* <Button
					key={"language"}
					type={"language"}
					showSelectLangModal={showSelectLangModal}
					title={translate.settings}
					isShowing={toggleSelectLangModal}
				>
					{translate.lang}
				</Button> */}
				<Button
					key={"settings"}
					type={"settings"}
					showUserSettingsModal={showUserSettingsModal}
					title={translate.settings}
					isShowing={toggleUserSettingsModal}
				>
					{translate.settings}
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
						<div
							key={"dialogCredit"}
							className="content"
							role="dialog"
						>
							<h3>{translate.changeSettings}</h3>
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
							<label
								key={"minimalmodeCredit"}
								htmlFor="minimalMode"
							>
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
				<Footer />

					</div>
				) : null}
			</div>
			{/* <div className={"buttonContainer"}>
				<Button
					key={"language"}
					type={"language"}
					showSelectLangModal={showSelectLangModal}
					title={translate.settings}
					isShowing={toggleSelectLangModal}
				>
					{translate.lang}
				</Button>
				{showSelectLangModal ? (
					<div
						key={"langContainer"}
						ref={langContainer}
						className={[
							showSelectLangModal ? "settingsContainer" : null,
							"animate",
						].join(" ")}
						role="presentation"
					>
						<div
							key={"dialogCredit"}
							className="content"
							role="dialog"
						>
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
			</div> */}
		</aside>
	);
};

export default Credit;
