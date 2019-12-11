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

	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		var strTime = hours + ":" + minutes + " " + ampm;
		return strTime;
	}

	function getPrayerTimeList() {
		const prayerTimeList = prayerTimes.list;
		return Object.keys(prayerTimeList || {}).reduce((result, key) => {
			const waktuSolat = translate.prayerList[key];
			const fullDate = prayerTimes.serverDate + " " + prayerTimeList[key];
			result[waktuSolat] = formatAMPM(new Date(fullDate));
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
