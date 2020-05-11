import React, {
	// useRef,
	// useMemo,
	useEffect,
} from "react";
import {
	Header,
	// Tazkirah,
	// Button,
	// Modal,
	// PrayerCountdown,
	// LocationSelector,
	PrayerTimeList,
} from "../../index";
// import {
// 	LocationIcon,
// 	SettingsIcon
// } from "../../index";
// import { useOuterClickNotifier } from "../../customHook/useGeneralHelper";
import { useSetPrayerTimes } from "../../customHook/useSetPrayerTimes";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";
import { useGetTranslation } from "../../customHook/useGetTranslation";
// import { useChangeLocationSettings } from "../../customHook/useChangeLocationSettings";

export const Body = () => {
	const {
			isMinimal,
			isNotificationEnabled,
			// setUserSettings
		} = useChangeUserSettings(),
		// {
		// locations,
		// locationSettings,
		// setStateName,
		// setStateCode,
		// showLocationModal,
		// toggleLocationModal,
		// getSelectedState,
		// getSelectedStateCode,
		// getSelectedMunicipal
		// } = useChangeLocationSettings(),
		{
			// solatTime,
			storeAndCalc,
			// prayerTimeList,
			currentPrayerTime,
			getPrayerTimeList,
			setSilencedTime,
			getSilencedTime,
			// nextPrayer,
			// timeToNextPrayer
			// setPrayerTimes
		} = useSetPrayerTimes(),
		{ getTranslation: translate } = useGetTranslation();

	// const locationSettingsModal = useRef(null);
	// useOuterClickNotifier(locationSettingsModal, toggleLocationModal);

	useEffect(() => {
		storeAndCalc();
	}, []);

	// useMemo(() => {
	// 	storeAndCalc();
	// }, [solatTime]);

	// return isMinimal ? null : (
	return (
		<article>
			{/* <div className="handlebar"></div> */}
			<Header />
			{/* <PrayerCountdown
				key={"prayercountdownBody"}
				translate={translate}
				timeToNextPrayer={timeToNextPrayer}
				nextPrayer={nextPrayer}
			/>
			<Button
				key={"locationSelector"}
				type="locationSelector"
				translate={translate}
				isShowing={toggleLocationModal}
			>
				<LocationIcon />
				<span>{getSelectedMunicipal || getSelectedState}</span>
			</Button>
			<Modal
				reference={locationSettingsModal}
				key={"locationSettingsModal"}
				hide={toggleLocationModal}
				isShowing={showLocationModal}
			>
				<h3 className={"locationSelectorTitle"}>
					{translate.locationSelector}
				</h3>
				<LocationSelector
					key={"locationselectorBody"}
					translate={translate}
					locations={locations}
					locationSettings={locationSettings}
					setStateName={setStateName}
					setStateCode={setStateCode}
				/>
			</Modal> */}
			{isMinimal ? null : (
				<section className="content">
					<PrayerTimeList
						key={"prayertimelistBody"}
						translate={translate}
						prayerTimeList={getPrayerTimeList}
						currentPrayerTime={currentPrayerTime}
						setSilencedTime={setSilencedTime}
						getSilencedTime={getSilencedTime}
						isNotificationEnabled={isNotificationEnabled}
					/>
				</section>
			)}
			{/* <Tazkirah description={getRandomTazkirah} /> */}
		</article>
	);
};
