import React from "react";
import style from "./button.module.css";
// import { isObjectEmpty } from "../../helper";

// import { useGetTranslation } from "../../customHook/useGetTranslation";
const Button = ({ type, isShowing, children }) => {
	// const { getTranslation: translate } = useGetTranslation();
	// console.log(translate);

	return (
		<div
			className={[
				type ? `${style.btn} ${style[type]}` : `${style.btn} `
			].join(" ")}
		>
			<button
				className={type}
				// title={translate[type]}
				// title={translate.type}
				onClick={isShowing}
			>
				{children}
			</button>
		</div>
	);
};

// const Button = (...props) => {
// 	return Object.keys(props || {}).map(keys => {
// 		const item = props[keys],
// 			type = item.type;

// 		return !isObjectEmpty(item) ? (
// 			<div
// 				className={[
// 					type ? `${style.btn} ${style[type]}` : `${style.btn} `
// 				].join(" ")}
// 			>
// 				<button
// 					key={item}
// 					className={type}
// 					// title={item.translate[type]}
// 					onClick={item.isShowing}
// 				>
// 					{item.children}
// 				</button>
// 			</div>
// 		) : null;
// 	});
// };

export default Button;
