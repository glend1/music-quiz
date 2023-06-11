import { useModalContext } from "../modalcontext/modalcontext";
import styles from "./modal.module.css";

export const Modal = () => {
	const [modalState, setModalState] = useModalContext();
	return (
		<div
			id={styles.modal}
			onClick={(e) => {
				e.stopPropagation();
				setModalState([]);
			}}
			className={`${modalState.length >= 1 && styles.unhide}`}
		>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className={styles.card}
			>
				{modalState[modalState.length - 1]?.node}
				<div className={styles.close}>
					{modalState.length >= 2 && (
						<button
							onClick={(e) => {
								e.preventDefault();
								setModalState((prev) => [prev[0]]);
							}}
						>
							Back to {modalState[0].title}
						</button>
					)}
					<button
						onClick={(e) => {
							e.stopPropagation();
							setModalState([]);
						}}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};
