import React from "react";
import style from "./prayerCountdown.module.css";

const PrayerCountdown = ({ timeToNextPrayer, nextPrayer, translate }) => {
	return (
		<div className={style.container}>
			<h2>
				{timeToNextPrayer}
				<span>
					{translate.prayerTimeEstimate} <b>{nextPrayer}</b>
				</span>
			</h2>
		</div>
	);
};

export default PrayerCountdown;
