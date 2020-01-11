import React, { useMemo } from "react";
import {
	// Tazkirah,
	PrayerTimeList
} from "../../index";
import { useSetPrayerTimes } from "../../customHook/useSetPrayerTimes";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";
import { useGetTranslation } from "../../customHook/useGetTranslation";

export const Body = () => {
	const {
			isMinimal,
			isNotificationEnabled
			// setUserSettings
		} = useChangeUserSettings(),
		{
			solatTime,
			storeAndCalc,
			// prayerTimeList,
			currentPrayerTime,
			getPrayerTimeList,
			setSilencedTime,
			getSilencedTime
			// setPrayerTimes
		} = useSetPrayerTimes(),
		{ getTranslation: translate } = useGetTranslation();

	// useEffect(() => {
	// 	storeAndCalc();
	// }, [solatTime]);
	useMemo(() => storeAndCalc(solatTime), [solatTime]);
	// useMemo(() => expensiveOperation(solatTime), [solatTime]);

	/* 	function expensiveOperation() {
		axios.get(solatTime).then(obj => {
			const response = obj.data,
				time = response.prayerTime[0],
				serverTime = response.serverTime
					.substr(0, response.serverTime.indexOf(" "))
					.split("-")
					.reverse()
					.join("-"),
				datas = {
					silenced: ["fajr", "asr"],
					list: {
						fajr: time.fajr,
						syuruk: time.syuruk,
						dhuhr: time.dhuhr,
						asr: time.asr,
						maghrib: time.maghrib,
						isha: time.isha
					},
					serverTime: time.date.split("-").join(" "),
					serverDate: response.serverTime.substr(
						0,
						response.serverTime.indexOf(" ")
					),
					timeToNextPrayer: "1 jam 15 min",
					nextPrayer: "Maghrib"
				};

			setPrayerTimes(datas); // save datas
			// getHijriFullDate(serverTime);
			// calcNextPrayer(response.serverTime);

			// setPrayerTimes({
			// 	timeToNextPrayer: "2 jam 15 min",
			// 	nextPrayer: "Maghrib"
			// });
		});
	}
 */
	return isMinimal ? null : (
		<article>
			<PrayerTimeList
				translate={translate}
				prayerTimeList={getPrayerTimeList}
				currentPrayerTime={currentPrayerTime}
				setSilencedTime={setSilencedTime}
				getSilencedTime={getSilencedTime}
				isNotificationEnabled={isNotificationEnabled}
			/>
			{/* <Tazkirah description={getRandomTazkirah} /> */}
		</article>
	);
};
