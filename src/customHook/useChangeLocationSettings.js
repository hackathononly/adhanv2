import { useStateValue } from "../state";
// import { useScrollTop } from "../helper";

export const useChangeLocationSettings = () => {
	const [
			{ initialState, locations, locationSettings },
			dispatch
		] = useStateValue(),
		showLocationModal = locationSettings.showModal,
		getSelectedState =
			locationSettings.selectedState || initialState.waktuSolatState,
		getSelectedMunicipal = locationSettings.selectedMunicipal
			.toString()
			.slice(
				0,
				locationSettings.selectedMunicipal.toString().indexOf(",")
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
			showModal: !locationSettings.showModal
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
					: Object.keys(locations[val])[0] // when click on state name, get first state code value
		});
	}
	function setStateCode(val) {
		setLocationSettings({
			selectedMunicipal: locations[getSelectedState][val].toString(),
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
		getSelectedMunicipal,
		showLocationModal,
		toggleLocationModal,
		setLocationSettings
	};
};
