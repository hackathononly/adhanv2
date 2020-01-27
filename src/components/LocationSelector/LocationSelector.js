import React, { useRef } from "react";
import style from "./locationSelector.module.css";
// import { scrollToRef } from "../../helper";

function scrollToRef(ref) {
	console.log(ref.current);
	ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
	ref.current.classList.add("top");
}

const LocationSelector = ({
	translate,
	setStateName,
	setStateCode,
	locations,
	locationSettings
}) => {
	const myRef = useRef(null);
	const executeScroll = () => scrollToRef(myRef);

	return (
		<div
			ref={myRef}
			className={[style.locationSelector, "locationsContainer"].join(" ")}
		>
			<ul
				style={{
					left: locationSettings.isNested ? "-100%" : "0",
					transitionDuration: locationSettings.isNested
						? "300ms"
						: "300ms"
				}}
			>
				{Object.keys(locations || {}).map(state => (
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
										: "none"
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
								subitem => (
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
