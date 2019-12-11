import React from "react";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";

const Credit = () => {
	const { getTranslation: translate } = useGetTranslation(),
		{ isMinimal } = useChangeUserSettings();
	return isMinimal ? null : (
		<footer>
			<small>{translate.credit}</small>
		</footer>
	);
};

export default Credit;
