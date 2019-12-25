import React from "react";
// import "../../../src/index.css";
import style from "./loadingBar.module.css";
import { LoadingBarIcon } from "../../index";
import { useChangeUserSettings } from "../../customHook/useChangeUserSettings";

const LoadingBar = () => {
	const { isLoadingBarShown } = useChangeUserSettings();
	return isLoadingBarShown ? (
		/* 	<div className={["container", "loadingBarContain"].join(" ")}> */
		// <div className={style.loadingBarContain}>
		<div className={"loadingBarContain"}>
			<div className={style.spinner}>
				<LoadingBarIcon />
				{/* Loading */}
			</div>
		</div>
	) : null;
};

export default LoadingBar;
