import React from "react";
import { Button, SettingsIcon } from "../index";
import { useGetTranslation } from "../customHook/useGetTranslation";
import { useChangeUserSettings } from "../customHook/useChangeUserSettings";

const Credit = () => {
	const { getTranslation: translate } = useGetTranslation();
	const { toggleUserSettingsModal } = useChangeUserSettings();
	return (
		<footer>
			{/* <small title={translate.subcredit}>{translate.credit}</small> */}
			<Button
				type="settings"
				title={translate.settings}
				isShowing={toggleUserSettingsModal}
			>
				<SettingsIcon />
			</Button>
		</footer>
	);
};

export default Credit;
