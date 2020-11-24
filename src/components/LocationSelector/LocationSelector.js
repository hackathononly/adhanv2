import React, { useRef } from "react";
import style from "./locationSelector.module.css";

const LocationSelector = ({
	translate,
	setStateName,
	setStateCode,
	locations,
	locationSettings,
}) => {
	const locationSelector = useRef(null);
	const executeScroll = () => {
		// console.log(locationSelector.current.getElementsByTagName('ul'));
		locationSelector.current.scrollIntoView(true);
		// locationSelector.current.scrollBy(0, -10);
		// locationSelector.current.scrollIntoView({
		// 	behavior: "smooth",
		// 	block: "start"
		// });
		// locationSelector.current.classList.add("top");
	};
	return (
		<div className={style.locationSelector}>
			<ul
				ref={locationSelector}
				style={{
					left: locationSettings.isNested ? "-100%" : "0",
					transitionDuration: locationSettings.isNested
						? "300ms"
						: "300ms",
				}}
			>
				{Object.keys(locations || {}).map((state) => (
					<li key={state}>
						<a
							key={"container_" + state}
							href="/#"
							className={
								state === locationSettings.selectedState
									? style.active
									: null
							}
							title={state}
							onClick={() => {
								executeScroll();
								setStateName(state);
							}}
						>
							{state}
						</a>
						<ul
							key={state}
							style={{
								display:
									locationSettings.selectedState === state
										? "block"
										: "none",
							}}
						>
							<li className={style.home}>
								<a
									href="/#"
									onClick={() => {
										// executeScroll();
										setStateName(state);
									}}
									title={translate.backDesc}
								>
									<span>{translate.back}</span>
								</a>
							</li>
							{Object.keys(locations[state] || {}).map(
								(subitem) => (
									<li key={subitem}>
										<a
											href="/#"
											title={subitem}
											className={
												subitem ===
													locationSettings.selectedStateCode
													? style.active
													: null
											}
											onClick={() =>
												setStateCode(
													subitem,
													locations[state][subitem]
												)
											}
										>
											{locations[state][subitem]}
										</a>
									</li>
								)
							)}
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};
export default LocationSelector;
