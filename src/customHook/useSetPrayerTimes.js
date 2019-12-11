import axios from "axios";
import { useStateValue } from "../state";
import { useGetTranslation } from "../customHook/useGetTranslation";
import Constants from "../constants";

export const useSetPrayerTimes = () => {
	const [
			{ locationSettings, languages, prayerTimes, userSettings },
			dispatch
		] = useStateValue(),
		{ getTranslation: translate } = useGetTranslation(),
		selectedLang = userSettings.selectedLang;

	const serverTime = prayerTimes.serverTime,
		hijriDate = prayerTimes.hijriDate[selectedLang],
		nextPrayer = getNextPrayer(),
		solatTime = Constants.waktuSolatURL(
			locationSettings.selectedStateCode ||
				Constants.defaultSettings.waktuSolatStateCode
		);

	function getNextPrayer() {
		return prayerTimes.nextPrayer;
	}

	function getPrayerTimeList() {
		const prayerTimeList = prayerTimes.list;
		return Object.keys(prayerTimeList || {}).reduce((result, key) => {
			const waktuSolat = translate.prayerList[key];
			result[waktuSolat] = prayerTimeList[key];
			return result;
		}, {});
	}

	function setSilencedTime(val) {
		return setPrayerTimes({ silenced: val });
	}

	function calcNextPrayer(time) {
		setPrayerTimes({
			nextPrayer: "Maghrib"
		});
	}

	function getHijriFullDate(serverTime) {
		// const islamicDateAPI = `http://api.aladhan.com/v1/gToH?date=${serverTime}`; //http://api.aladhan.com/v1/gToH?date=22-11-2019
		const islamicDateAPI = `http://localhost:3000/sampledata/constants-date.json`;
		axios.get(islamicDateAPI).then(obj => {
			const hijriDate = obj.data.data.hijri;
			const multiLanguageHijriDatesObj = Object.keys(languages || {}).map(
				keys => {
					const hijriFullDate = [
						hijriDate.day,
						keys === "arabic"
							? hijriDate.month.ar
							: hijriDate.month.en,
						hijriDate.year
					].join(" ");
					return { [keys]: hijriFullDate };
				}
			);
			const multiLanguageHijriDates = multiLanguageHijriDatesObj.reduce(
				(result, key) => {
					Object.keys(key).forEach(lang => {
						result[lang] = key[lang];
					});
					return result;
				},
				{}
			);
			return setPrayerTimes({ hijriDate: multiLanguageHijriDates });
		}, []);
	}

	function setPrayerTimes(obj) {
		Object.keys(obj || {}).map(key => {
			return dispatch({
				type: "setPrayerTimes",
				mode: key,
				value: obj[key]
			});
		});
	}
	return {
		nextPrayer,
		solatTime,
		hijriDate,
		getHijriFullDate,
		serverTime,
		prayerTimeList: getPrayerTimeList(),
		calcNextPrayer,
		setPrayerTimes,
		setSilencedTime
	};
};
