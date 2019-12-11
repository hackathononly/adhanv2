import React from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import { Button, CloseIcon } from "../../index";

const Modal = ({ hide, isShowing, children }) =>
	isShowing
		? ReactDOM.createPortal(
				<>
					<div className={[style.modal, style.open].join(" ")}>
						<div className={style.content}>
							<div className={style.container}>
								<Button type="close" isShowing={hide}>
									<CloseIcon width="30" height="30" />
								</Button>
								{children}
							</div>
						</div>
					</div>
				</>,
				document.body
		  )
		: null;

export default Modal;
