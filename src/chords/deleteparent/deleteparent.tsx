import styles from "./deleteparent.module.css";
import React, { Dispatch, SetStateAction } from "react";

type OptionalCallback = { cb?: () => void };

export function DeleteParent({ cb }: OptionalCallback) {
	return (
		<button
			className={styles.deleteParent}
			onClick={(e) => {
				const element = e.target as HTMLElement;
				if (element.parentNode) {
					const parentElement = element.parentNode;
					if (parentElement.parentNode) {
						parentElement.parentNode.removeChild(parentElement);
						if (cb) {
							cb();
						}
					}
				}
			}}
		>
			Remove
		</button>
	);
}
