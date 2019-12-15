import { useStateValue } from "../state";

export const useChangeLocationSettings = () => {
	const [
			{ initialState, locations, locationSettings },
			dispatch
		] = useStateValue(),
		showLocationModal = locationSettings.showModal,
		getSelectedState =
			locationSettings.selectedState || initialState.waktuSolatState,
		getSelectedStateCode =
			locationSettings.selectedStateCode ||
			initialState.waktuSolatStateCode;

	function toggleLocationModal() {
		setLocationSettings({
			showModal: !locationSettings.showModal
		});
	}
	function setStateName(val) {
		setLocationSettings({
			isNested: !locationSettings.isNested,
			selectedState: val,
			selectedStateCode:
				locationSettings.selectedStateCode &&
				locationSettings.selectedState === val
					? locationSettings.selectedStateCode
					: Object.keys(locations[val])[0] // when click on state name, get first state code value
		});
	}
	function setStateCode(val) {
		setLocationSettings({
			selectedStateCode: val
		});
	}
	function setLocationSettings(obj) {
		Object.keys(obj).map(key => {
			return dispatch({
				type: "setLocationSettings",
				mode: key,
				value: obj[key]
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
		showLocationModal,
		toggleLocationModal,
		setLocationSettings
	};
};
