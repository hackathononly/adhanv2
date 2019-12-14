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
			const waktuSolat = translate.prayerList[key],
				fullDate = prayerTimes.serverDate + " " + prayerTimeList[key],
				timestamp = Date.parse(fullDate);
			if (isNaN(timestamp) === false) {
				result[waktuSolat] = formatAMPM(new Date(fullDate));
			}
			// result[waktuSolat] = formatAMPM(new Date(fullDate));
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

	/*

	calcNextPrayerTime = () => {
		var timeListArray = [],
			prayerTimeList = Object.values(this.state.prayerTime.list), //["05:53:00","07:09:00","13:20:00","16:30:00","19:27:00","20:37:00"]
			currentTime = new Date().getTime(),
			// currentTime = moment().valueOf(), // currentTime in epoch format, ex : 1555544120452
			ok = Object.keys(this.state.prayerTime.list); // ["fajr","syuruk", "duhr", "asar", "maghrib", "isha"]

		// console.log(currentTime, moment().valueOf());

		for (i = 0; i < prayerTimeList.length; i++) {
			const string = "2019-04-22T17:00:00Z",
				// 	newDate = new Date(string).getTime();
				newDate = new Date("Mon Apr 22 2019 07:36:00 GMT"); // ""Day Mon dd yyyy hh:mm:ss GMT/UTC
			timeListArray.push(Math.abs(currentTime - newDate)); // get closest Time to current
			// console.log(prayerTimeList[i], timeListArray);
			console.log(
				moment(new Date()).format("YYYY MMM D H:mm:ss"),
				// new Date(string),
				// moment().format("ll"),
				timeListArray,
				currentTime,
				newDate
				// newDate.getTime(),
				// string
			);
		}
		var i = timeListArray.indexOf(Math.min.apply(Math, timeListArray)),
			// timeString =
			// 	moment().format("YYYY-MM-DD") + "T" + timeListArray[i] + "Z",
			// time = new Date(timeString),
			// closestPrayerTime = time.getTime();
			closestPrayerTime = new Date(
				// moment().format("mm/dd/yyyy") + "11:05:00"
				"Apr 22 2019 07:31:00 GMT"
			); // "mm/dd/yyyy hh:mm:ss"

		// console.log(
		// 	i,
		// 	timeListArray[i],
		// 	// timeString,
		// 	new Date(timeListArray[i]),
		// 	closestPrayerTime
		// );

		this.setState(previousState => ({
			prayerTime: {
				...previousState.prayerTime,
				// nextPrayer: ok[i]
				nextPrayer:
					currentTime > closestPrayerTime ? ok[i + 1] || ok[0] : ok[i]
				// timeToNextPrayer: this.calcTimeDiff(currentTime, new Date())
				// currentTime > timeListArray[i] ? this.calcTimeDiff() : ""
			}
		}));
	};






		self.interval = setInterval(function() {
			self.setState(previousState => ({
				prayerTime: {
					...previousState.prayerTime,
					machineTime: new Date().getTime()
				}
			}));
		}, 1000);
	*/

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
