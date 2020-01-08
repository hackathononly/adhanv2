import React from "react";

const Checkbox = ({ id, isSet, isChecked }) => {
	return (
		<input
			id={id}
			type="checkbox"
			onChange={isSet}
			defaultChecked={isChecked}
		/>
		// <>
		// 	<input
		// 		id={id}
		// 		type="checkbox"
		// 		onChange={isSet}
		// 		defaultChecked={isChecked}
		// 	/>
		// 	<label for={id}>{id}</label>
		// </>
	);
};

/*
<style>
	input[type="checkbox"] {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	label {
		cursor: pointer;
		text-indent: -9999px;
		width: 200px;
		height: 100px;
		background: grey;
		display: block;
		border-radius: 100px;
		position: relative;
	}

	label:after {
		content: "";
		position: absolute;
		top: 5px;
		left: 5px;
		width: 90px;
		height: 90px;
		background: #fff;
		border-radius: 90px;
		transition: 0.3s;
	}

	input:checked + label {
		background: #bada55;
	}

	input:checked + label:after {
		left: calc(100% - 5px);
		transform: translateX(-100%);
	}

	label:active:after {
		width: 130px;
	}
</style>

<input type="checkbox" id="switch" /><label for="switch">Toggle</label>

*/

export default Checkbox;
