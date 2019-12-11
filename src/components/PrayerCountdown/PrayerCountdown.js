import React from "react";
import style from "./prayerCountdown.module.css";
import { useGetTranslation } from "../../customHook/useGetTranslation";

const PrayerCountdown = ({ timeToNextPrayer, nextPrayer }) => {
	const { getTranslation: translate } = useGetTranslation();

	return (
		<h2 className={style.container}>
			{timeToNextPrayer} {translate.prayerTimeEstimate}
			<span>
				<b>{nextPrayer}</b>
			</span>
		</h2>
	);
};

export default PrayerCountdown;
