import React from "react";
import { useGetTranslation } from "../customHook/useGetTranslation";

const Credit = () => {
	const { getTranslation: translate } = useGetTranslation();
	return (
		<footer>
			<small title={translate.subcredit}>{translate.credit}</small>
		</footer>
	);
};

export default Credit;
