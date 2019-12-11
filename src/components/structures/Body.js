import axios from "axios";
import React, { useEffect } from "react";
import { Tazkirah, PrayerTimeList } from "../../index";
import { useSetPrayerTimes } from "../../customHook/useSetPrayerTimes";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";
import { useGetTranslation } from "../../customHook/useGetTranslation";

export const Body = () => {
	const { isMinimal, isNotificationEnabled } = useChangeUserSettings(),
		{
			solatTime,
			prayerTimeList,
			setPrayerTimes,
			calcNextPrayer,
			setSilencedTime,
			getHijriFullDate
		} = useSetPrayerTimes(),
		{ getRandomTazkirah } = useGetTranslation();

	useEffect(() => {
		// axios.get("http://localhost:3000/sampledata/daily.json").then(obj => {
		axios.get(solatTime).then(obj => {
			const response = obj.data,
				time = response.prayerTime[0],
				serverTime = response.serverTime
					.substr(0, response.serverTime.indexOf(" "))
					.split("-")
					.reverse()
					.join("-"),
				datas = {
					silenced: [],
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
					)
				};
			setPrayerTimes(datas);
			getHijriFullDate(serverTime);
			calcNextPrayer(serverTime);
		});
	}, [solatTime]);

	return isMinimal ? null : (
		<article>
			<PrayerTimeList
				isNotificationEnabled={isNotificationEnabled}
				prayerTimeList={prayerTimeList}
				setSilencedTime={setSilencedTime}
			/>
			<Tazkirah description={getRandomTazkirah} />
		</article>
	);
};
