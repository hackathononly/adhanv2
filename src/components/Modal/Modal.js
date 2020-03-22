import React from "react";
import ReactDOM from "react-dom";
import style from "./modal.module.css";
import { Button, CloseIcon } from "../../index";

const Modal = ({ translate, reference, hide, isShowing, children }) => {
	return isShowing
		? ReactDOM.createPortal(
				<>
					<div className={style.overlay} role="presentation">
						<div
							ref={reference}
							className={[style.modal, style.open].join(" ")}
							role="dialog"
						>
							<div className={style.content}>
								<div className={style.container}>
									<Button
										key={"close"}
										type="close"
										title={translate.close}
										isShowing={hide}
									>
										<CloseIcon width="30" height="30" />
									</Button>
									{children}
								</div>
							</div>
						</div>
					</div>
				</>,
				document.body
		  )
		: null;
};

export default Modal;
