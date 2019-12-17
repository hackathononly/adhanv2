import React from "react";
import style from "./button.module.css";
import { useGetTranslation } from "../../customHook/useGetTranslation";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";

const Button = ({ type, isShowing, children }) => {
	const { getTranslation: translate } = useGetTranslation(),
		{ isDarkMode } = useChangeUserSettings();
	return (
		<div
			className={[
				isDarkMode ? style.isDarkMode : null,
				type
					? `${style.btn} ${style[isDarkMode]} ${style[type]}`
					: `${style.btn} ${style[isDarkMode]}`
			].join(" ")}
		>
			<button
				className={type}
				title={translate[type]}
				onClick={isShowing}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
