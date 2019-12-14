import React from "react";
import { useGetTranslation } from "../customHook/useGetTranslation";

const Credit = () => {
	const { getTranslation: translate } = useGetTranslation();
	return (
		<footer>
			<small>{translate.credit}</small>
		</footer>
	);
};

export default Credit;
