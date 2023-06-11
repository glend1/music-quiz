import { createContext, useContext, useState } from "react";
import { Modal } from "../modal/modal";

export type ModalNode = { title: string; node: React.ReactNode };

const modalContext = createContext<
	[ModalNode[], React.Dispatch<React.SetStateAction<ModalNode[]>>]
>([[], () => {}]);

export function ModalContext({ children }: { children?: React.ReactNode }) {
	const modalState = useState<ModalNode[]>([]);
	return (
		<modalContext.Provider value={modalState}>
			{children}
			<Modal />
		</modalContext.Provider>
	);
}

export function useModalContext() {
	return useContext(modalContext);
}
