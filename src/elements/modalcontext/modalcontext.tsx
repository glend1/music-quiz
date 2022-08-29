import { createContext, MouseEventHandler, useContext } from "react";
import * as ReactDOM from "react-dom/client";
import styles from "./modalcontext.module.css";

type modalTypes = {
	scale?: string;
	chord?: string;
};

function Modal() {
	function openModal(cb: (data: modalTypes) => JSX.Element) {
		const returnFunction: MouseEventHandler<HTMLAnchorElement | HTMLElement> = (
			e
		) => {
			let modalElement = document.getElementById(styles.modal);
			let data: modalTypes = (e.target as HTMLElement).dataset;
			if (modalElement) {
				let div = document.createElement("div");
				div.classList.add(styles.card);
				div.addEventListener("click", (e) => {
					e.stopPropagation();
				});
				modalElement.appendChild(div);
				ReactDOM.createRoot(div).render(
					<>
						<div>{cb(data)}</div>
						<div className={styles.close}>
							<button onClick={closeModal}>Close</button>
						</div>
					</>
				);
				if (!modalElement.classList.contains(styles.unhide)) {
					modalElement.classList.add(styles.unhide);
				}
			}
		};
		return returnFunction;
	}
	let closeModal: MouseEventHandler<HTMLElement> = (e) => {
		let modalElement = document.getElementById(styles.modal);
		if (modalElement) {
			let elem = (e.target as HTMLElement).parentNode?.parentNode;
			if (elem) {
				modalElement.removeChild(elem);
			}
			if (modalElement.childElementCount < 1) {
				modalElement.classList.remove(styles.unhide);
			}
		}
	};
	let closeModalGlobal: MouseEventHandler<HTMLElement> = (e) => {
		let modalElement = document.getElementById(styles.modal);
		if (modalElement) {
			modalElement.innerHTML = "";
			modalElement.classList.remove(styles.unhide);
		}
	};
	return {
		openModal,
		closeModalGlobal,
	};
}

const modalContext = createContext(Modal().openModal);

export function GlobalModalContext({
	children,
	modal = false,
}: {
	children?: React.ReactNode;
	modal?: boolean;
}) {
	const modalElement = Modal();
	return (
		<modalContext.Provider value={modalElement.openModal}>
			{children}
			{modal ? (
				<div id={styles.modal} onClick={modalElement.closeModalGlobal}></div>
			) : null}
		</modalContext.Provider>
	);
}

export function useModalContext() {
	return useContext(modalContext);
}
