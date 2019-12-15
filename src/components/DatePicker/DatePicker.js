import React from "react";
import style from "./datePicker.module.css";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";

const DatePicker = React.memo(({ hijriDate, gregorianDate }) => {
	const { selectedLang } = useChangeUserSettings();
	return (
		<aside id="datePicker" className={style.datePicker}>
			<b>{gregorianDate}</b>
			<small className={style[selectedLang]}>{hijriDate}</small>
		</aside>
	);
});

export default DatePicker;
