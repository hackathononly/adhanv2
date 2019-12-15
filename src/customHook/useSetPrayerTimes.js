import axios from "axios";
import moment from "moment";
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
		nextPrayer = prayerTimes.nextPrayer,
		timeToNextPrayer = prayerTimes.timeToNextPrayer,
		solatTime = Constants.waktuSolatURL(
			locationSettings.selectedStateCode ||
				Constants.defaultSettings.waktuSolatStateCode
		);

	function getPrayerTimeList() {
		const prayerTimeList = prayerTimes.list;
		return Object.keys(prayerTimeList || {}).reduce((result, key) => {
			const waktuSolat = translate.prayerList[key],
				fullDate = prayerTimes.serverDate + " " + prayerTimeList[key];
			result[waktuSolat] = moment(
				new Date(fullDate.replace(/ /g, "T")) // replace space in dateString with "T"
			).format("hh:mm A");
			return result;
		}, {});
	}

	function setSilencedTime(val) {
		return setPrayerTimes({ silenced: val });
	}

	function calcNextPrayer(time) {
		var firstDate = moment();
		var secondDate = moment(time);
		// var secondDate = moment("2018-03-19");
		var yearDiff = firstDate.diff(secondDate, "year");
		var monthDiff = firstDate.diff(secondDate, "month");
		var dayDiff = firstDate.diff(secondDate, "day");
		console.log(
			// moment(time),
			// firstDate,
			// secondDate,
			yearDiff + " Years, " + monthDiff + " Months, " + dayDiff + " Days"
		);

		setPrayerTimes({
			timeToNextPrayer: "2 jam 15 min",
			nextPrayer: "Maghrib"
		});
	}

	function getHijriFullDate(serverTime) {
		const islamicDateAPI = `//api.aladhan.com/v1/gToH?date=${serverTime}`; //http://api.aladhan.com/v1/gToH?date=22-11-2019
		// const islamicDateAPI = "/sampledata/constants-date.json";
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
		timeToNextPrayer,
		solatTime, // pass state code to axios on Body
		hijriDate,
		getHijriFullDate,
		serverTime,
		prayerTimeList: getPrayerTimeList(),
		calcNextPrayer, // set nextPrayer, timeToNextPrayer
		setPrayerTimes,
		setSilencedTime
	};
};
