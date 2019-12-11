import React from "react";
import { Checkbox, Notification, NotificationDisable } from "../../index";
import style from "./prayerTimeList.module.css";

const PrayerTimeList = ({
	prayerTimeList,
	setSilencedTime,
	isNotificationEnabled
}) => {
	return (
		<section
			id="prayerTimeList"
			className={[
				isNotificationEnabled ? style.enableNotification : null,
				style.container
			].join(" ")}
		>
			<ul>
				{Object.keys(prayerTimeList || {}).map(item => (
					<li key={item}>
						<Checkbox
							id={item}
							isSet={() => setSilencedTime(item)}
							isChecked={isNotificationEnabled}
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
};

export default PrayerTimeList;
