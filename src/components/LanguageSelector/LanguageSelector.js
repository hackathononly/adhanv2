import React, { useRef } from "react";
import { Button } from "../../index";
import { useOuterClickNotifier } from "../../customHook/useGeneralHelper";
import style from "./languageSelector.module.css";

const LanguageSelector = ({
	translate,
	// isShowing,
	// translate,
	toggleLanguageModal,
	langList,
	setLang,
	selectedLang
}) => {
	const innerRef = useRef(null);
	useOuterClickNotifier(innerRef, toggleLanguageModal);

	// return isShowing ? (
	return (
		// return (
		<section
			ref={innerRef}
			className={[style.container, "languages"].join(
				// className={[style.container, "languages", "settingsContainer"].join(
				" "
			)}
		>
			<h3>{translate.changeLang}</h3>
			{Object.keys(langList || {}).map(key => (
				<>
					{/* <a
						key={key}
						href="/#"
						title={key}
						className={key === selectedLang ? style.active : null}
						onClick={e => setLang(e.currentTarget.text)}
					>
						{key}
					</a> */}
					<Button
						key={key}
						title={key}
						type={key === selectedLang ? style.active : null}
						isShowing={e => setLang(e.target.innerHTML)}
					>
						{key}
					</Button>
				</>
			))}
		</section>
	);
	// ) : null;
	// ) ;
};

export default LanguageSelector;
