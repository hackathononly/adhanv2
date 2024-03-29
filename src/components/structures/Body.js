import React, { useEffect } from "react";
import { Header, PrayerTimeList } from "../../index";
import { useSetPrayerTimes } from "../../customHook/useSetPrayerTimes";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";
import { useGetTranslation } from "../../customHook/useGetTranslation";

export const Body = () => {
	const { isMinimal, isNotificationEnabled } = useChangeUserSettings(),
		{
			initAdhanApp,
			currentPrayerTime,
			setSilencedTime,
			getSilencedTime,
			prayerTimeList
		} = useSetPrayerTimes(),
		{ getTranslation: translate } = useGetTranslation();

	useEffect(() => {
		initAdhanApp();
	}, []);

	return (
		<article>
			<Header />
			{isMinimal ? null : (
				<section className="content">
					<div className="scroll-content-outer">
						<div className="scroll-content-inner">
							<PrayerTimeList
								key={"prayertimelistBody"}
								translate={translate}
								prayerTimeList={prayerTimeList}
								currentPrayerTime={currentPrayerTime}
								setSilencedTime={setSilencedTime}
								getSilencedTime={getSilencedTime}
								isNotificationEnabled={isNotificationEnabled}
							/>
						</div>
					</div>
				</section>
			)}
		</article>
	);
};
