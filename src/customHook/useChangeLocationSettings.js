import { useStateValue } from "../state";
import { useAdhanAppDB } from "../customHook/useAdhanAppDB";
// import { useScrollTop } from "../helper";

export const useChangeLocationSettings = () => {
	const [
			{ initialState, locations, locationSettings },
			dispatch,
		] = useStateValue(),
		{ updateRecord } = useAdhanAppDB(),
		showLocationModal = locationSettings.showModal,
		getSelectedState =
			locationSettings.selectedState || initialState.waktuSolatState,
		getSelectedMunicipal = locationSettings.selectedMunicipal.slice(
			0,
			locationSettings.selectedMunicipal.indexOf(",")
		),
		getSelectedStateCode =
			locationSettings.selectedStateCode ||
			initialState.waktuSolatStateCode;

	function toggleLocationModal() {
		locationSettings.showModal
			? (document.body.style.overflow = "auto")
			: (document.body.style.overflow = "hidden");

		// ! set wrapper overflow as hidden

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
	function setLocationSettings(setting) {
		updateRecord("location", setting);
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
		getSelectedStateCode,
		getSelectedMunicipal,
		showLocationModal,
		toggleLocationModal,
		setLocationSettings,
	};
};
