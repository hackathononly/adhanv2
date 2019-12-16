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
			// result[waktuSolat] = moment(
			// 	new Date(fullDate.replace(/ /g, "T")) // replace space in dateString with "T"
			// ).format("hh:mm A");
			result[waktuSolat] = moment(fullDate).format("hh:mm A");
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
		// console.log(
		// 	// moment(time),
		// 	// firstDate,
		// 	// secondDate,
		// 	yearDiff + " Years, " + monthDiff + " Months, " + dayDiff + " Days"
		// );

		setPrayerTimes({
			timeToNextPrayer: "2 jam 15 min",
			nextPrayer: "Maghrib"
		});
	}

	function getHijriFullDate(serverTime) {
		const reverseServerTime = serverTime
				.split("-")
				.reverse()
				.join("-"),
			islamicDateAPI = Constants.hijriDate(reverseServerTime),
			// islamicDateAPI = "/sampledata/constants-date.json",
			islamicDateAPIArabic = Constants.hijriDateArabic(serverTime);

		axios
			.all([axios.get(islamicDateAPI), axios.get(islamicDateAPIArabic)])
			.then(obj => {
				const hijriDate = obj[0].data.takwim[reverseServerTime], // Jakim
					hijriDateArabic = obj[1].data.data.hijri, // Aladhan
					jakimDate = hijriDate.split("-"); // [ "1441", "04", "19" ]

				const multiLanguageHijriDatesObj = Object.keys(
					languages || {}
				).map(keys => {
					const hijriFullDate = [
						// hijriDateArabic.day,
						jakimDate[2],
						keys === "arabic"
							? hijriDateArabic.month.ar
							: Constants.islamicMonth[jakimDate[1]],
						hijriDateArabic.year
					].join(" ");
					return { [keys]: hijriFullDate };
				});
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
