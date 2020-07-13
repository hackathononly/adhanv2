import React, { useRef } from "react";
import {
	Credit,
	Modal,
	Button,
	LocationIcon,
	PrayerCountdown,
	LocationSelector,
} from "../../index";
import {
	useScrollNotifier,
	useOuterClickNotifier,
} from "../../customHook/useGeneralHelper";
import { useGetTranslation } from "../../customHook/useGetTranslation";
import { useSetPrayerTimes } from "../../customHook/useSetPrayerTimes";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";
import { useChangeLocationSettings } from "../../customHook/useChangeLocationSettings";

export const Header = () => {
	const {
			isScrolling,
			checkIsScrolling,
			isDarkMode,
		} = useChangeUserSettings(),
		{
			locations,
			locationSettings,
			setStateName,
			setStateCode,
			showLocationModal,
			toggleLocationModal,
			getSelectedState,
			getSelectedMunicipal,
		} = useChangeLocationSettings(),
		{ nextPrayer, timeToNextPrayer } = useSetPrayerTimes(),
		{ getTranslation: translate } = useGetTranslation();

	const locationSettingsModal = useRef(null);
	useOuterClickNotifier(locationSettingsModal, toggleLocationModal);

	const header = useRef(null);
	useScrollNotifier(header, checkIsScrolling);

	return (
		<>
			<Credit key={"creditHeader"} />
			<header>
				<div className="content">
					<div
						className={[
							isScrolling ? "itemScroll" : null,
							"subcontent",
						].join(" ")}
					>
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
							<span>
								<LocationIcon />
								{getSelectedMunicipal || getSelectedState}
							</span>
						</Button>
						<Modal
							key={"modalHeader"}
							translate={translate}
							reference={locationSettingsModal}
							hide={toggleLocationModal}
							isShowing={showLocationModal}
							isDarkMode={isDarkMode}
						>
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
					</div>
				</div>
			</header>
		</>
	);
};
