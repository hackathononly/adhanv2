import React from "react";
import { Checkbox, Notification, NotificationDisable } from "../../index";
import style from "./prayerTimeList.module.css";

const PrayerTimeList = React.memo(
	({
		translate,
		prayerTimeList,
		setSilencedTime,
		getSilencedTime,
		currentPrayerTime,
		isNotificationEnabled
	}) => {
		const prayerTimeKey = Object.keys(translate.prayerList); // get keys of prayerTimes, for defaultChecked purpose : ['fajr', 'syuruk', 'dhuhr', 'asr'...]
		return (
			<section
				className={[
					isNotificationEnabled ? style.enableNotification : null,
					style.container
				].join(" ")}
			>
				<ul>
					{Object.keys(prayerTimeList || {}).map((item, index) => (
						<li
							title={
								prayerTimeKey[index] === currentPrayerTime
									? translate.currentPrayerTime
									: null
							}
							key={item}
							className={
								prayerTimeKey[index] === currentPrayerTime
									? style.currentPrayerTime
									: null
							}
						>
							<Checkbox
								id={item}
								isSet={() =>
									setSilencedTime(prayerTimeKey[index])
								}
								isChecked={getSilencedTime.includes(
									prayerTimeKey[index]
								)}
							/>
							<label htmlFor={item}>
								{isNotificationEnabled
									? [
											<Notification
												key={"notification"}
												className={
													("notification",
													[
														style.icon,
														style.notification
													].join(" "))
												}
											/>,
											<NotificationDisable
												key={"notificationDisable"}
												className={
													("notificationDisable",
													[
														style.icon,
														style.notificationDisable
													].join(" "))
												}
											/>
									  ]
									: null}
								<span className={style.salahName}>{item}</span>
								<span className={style.salahTime}>
									{prayerTimeList[item]}
								</span>
							</label>
						</li>
					))}
				</ul>
			</section>
		);
	}
);

export default PrayerTimeList;
