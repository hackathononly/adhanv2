import React from "react";
import style from "./button.module.css";
import { useGetTranslation } from "../../customHook/useGetTranslation";

const Button = ({ type, isShowing, children }) => {
	const { getTranslation: translate } = useGetTranslation();
	return (
		<div
			className={[
				type ? `${style.btn} ${style[type]}` : `${style.btn} }`
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
