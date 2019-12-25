import React from "react";
import { Checkbox, Notification, NotificationDisable } from "../../index";
import { useGetTranslation } from "../../customHook/useGetTranslation";
import style from "./prayerTimeList.module.css";

const PrayerTimeList = React.memo(
	({
		prayerTimeList,
		setSilencedTime,
		getSilencedTime,
		isNotificationEnabled
	}) => {
		const { getTranslation } = useGetTranslation();
		const prayerTimeKey = Object.keys(getTranslation.prayerList); // get keys of prayerTimes, for defaultChecked purpose
		return (
			<section
				id="prayerTimeList"
				className={[
					isNotificationEnabled ? style.enableNotification : null,
					style.container
				].join(" ")}
			>
				<ul>
					{Object.keys(prayerTimeList || {}).map((item, index) => (
						<li key={item}>
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
								{item}
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
