import { useStateValue } from "../state";

export const useGetTranslation = () => {
	const [{ i18n, userSettings }] = useStateValue(),
		getTranslation = i18n[userSettings.selectedLang],
		tazkirahList = getTranslation.tazkirahDesc,
		// getRandomTazkirahCount =
		// 	tazkirahList[Math.floor(Math.random() * tazkirahList.length)],
		getRandomTazkirah = tazkirahList[0];
	return {
		getTranslation,
		getRandomTazkirah
		// getRandomTazkirah: getRandomTazkirahCount
	};
};
