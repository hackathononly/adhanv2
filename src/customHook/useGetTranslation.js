import { useStateValue } from "../state";

export const useGetTranslation = () => {
	const [{ i18n, userSettings }] = useStateValue(),
		getTranslation = i18n[userSettings.selectedLang];
	return {
		getTranslation,
	};
};
