import React, { useRef } from "react";
import { Button } from "../../index";
import { useOuterClickNotifier } from "../../helper";
import style from "./languageSelector.module.css";

const LanguageSelector = ({
	isShowing,
	toggleLanguageModal,
	langList,
	setLang,
	selectedLang
}) => {
	const innerRef = useRef(null);
	useOuterClickNotifier(innerRef, toggleLanguageModal);

	return isShowing ? (
		<section
			ref={innerRef}
			className={[style.container, "languages", "settingsContainer"].join(
				" "
			)}
		>
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
	) : null;
};

export default LanguageSelector;
