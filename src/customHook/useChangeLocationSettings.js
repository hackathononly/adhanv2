import { useStateValue } from "../state";
import { useAdhanAppDB } from "../customHook/useAdhanAppDB";
import { useSetPrayerTimes } from "../customHook/useSetPrayerTimes";

export const useChangeLocationSettings = () => {
	const [{ locations, locationSettings }, dispatch] = useStateValue(),
		{ updateRecord, getRecordByKey } = useAdhanAppDB(),
		{
			setPrayerTimes,
			getTodayPrayerTime,
			getPrayerTimeDatas,
			calculateCurrentNextPrayerTimes,
		} = useSetPrayerTimes();

	const getSelectedMunicipal = locationSettings.selectedMunicipal.slice(
			0,
			locationSettings.selectedMunicipal.indexOf(",")
		),
		getSelectedState = locationSettings.selectedState,
		showLocationModal = locationSettings.showModal;

	function toggleLocationModal() {
		locationSettings.showModal
			? (document.body.style.overflow = "auto")
			: (document.body.style.overflow = "hidden");
		setLocationSettings({
			showModal: !locationSettings.showModal,
		});
	}
	function setStateName(val) {
		setLocationSettings({
			isNested: !locationSettings.isNested,
			selectedState: val,
			selectedMunicipal:
				locationSettings.selectedMunicipal &&
				locationSettings.selectedState === val
					? locationSettings.selectedMunicipal
					: Object.values(locations[val])[0], // when click on state name, get first state code value
			selectedStateCode:
				locationSettings.selectedStateCode &&
				locationSettings.selectedState === val
					? locationSettings.selectedStateCode
					: Object.keys(locations[val])[0], // when click on state name, get first state code value
		});
	}
	function setStateCode(val) {
		setLocationSettings({
			selectedMunicipal: locations[getSelectedState][val].toString(),
			selectedStateCode: val,
		});
	}
	async function setLocationSettings(setting) {
		const prayerTimeRecord = await getRecordByKey(
				"prayerTime",
				locationSettings.selectedStateCode
			),
			todayPrayerTime = getTodayPrayerTime(prayerTimeRecord),
			prayerTimeList = getPrayerTimeDatas(todayPrayerTime);
		// console.log(todayPrayerTime);

		updateRecord("location", setting);
		setPrayerTimes(prayerTimeList);
		calculateCurrentNextPrayerTimes(prayerTimeList);

		Object.keys(setting).map((key) => {
			return dispatch({
				type: "setLocationSettings",
				mode: key,
				value: setting[key],
			});
		});
	}
	return {
		locations,
		locationSettings,
		setStateCode,
		setStateName,
		getSelectedState,
		getSelectedMunicipal,
		showLocationModal,
		toggleLocationModal,
		setLocationSettings,
	};
};
