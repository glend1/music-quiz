import { useState } from "react";
import { TNotes } from "../dictionaryutils/dictionaryutils";
import dStyles from "../dictionaryutils/dictionaryutils.module.css";
import kStyles from "../../canvas/piano/piano.module.css";
import { Piano } from "../../canvas/piano/piano";
import { INote, matchScales, normalizeNote } from "../../notes/notes/notes";
import Image from "next/image";
import React from "react";
import { ScaleInformation } from "../scaleinformation/scaleinformation";
import { list } from "../../elements/images";
import {
	GlobalModalContext,
	useModalContext,
} from "../../elements/modalcontext/modalcontext";
import { capitalizeFirstLetter } from "../../util/string/string";

export function Scales({ notes }: TNotes) {
	const [root, setRoot] = useState<string | undefined>();
	const modal = useModalContext();
	if (notes.length > 0) {
		return (
			<>
				<h2>Scales</h2>
				<span className={dStyles.bold}>Select a Scale Root</span>
				<Piano
					clickable={true}
					highlight={[]}
					width={200}
					height={75}
					cb={(e: React.MouseEvent<SVGElement>): void => {
						let element = e.target as SVGElement;
						let alreadySet = element.classList.contains(kStyles.show);
						let highlighted = element.parentNode!.parentNode!.querySelectorAll(
							`.${kStyles.show}`
						);
						if (highlighted.length > 0) {
							highlighted.forEach((el) => {
								el.classList.remove(kStyles.show);
							});
						}
						if (!alreadySet) {
							element.classList.add(kStyles.show);
							setRoot(normalizeNote(element.dataset as INote, 4, true)!.name);
						} else {
							setRoot(undefined);
						}
					}}
				/>
				{root && notes ? (
					<>
						{" "}
						<span className={dStyles.bold}>Scale Names</span>
						{matchScales(notes, root).map((scale, i) => {
							return (
								<div
									onClick={modal((data) => {
										return (
											<React.StrictMode>
												<GlobalModalContext>
													<ScaleInformation scale={scale} root={root} />
												</GlobalModalContext>
											</React.StrictMode>
										);
									})}
									className={`${dStyles.bubble} clickable`}
									key={scale}
								>
									<span className={dStyles.align}>
										{capitalizeFirstLetter(`${root} ${scale}`)}
									</span>
									<Image src={list} alt="Scale Information" />
								</div>
							);
						})}
					</>
				) : null}
			</>
		);
	}
	return null;
}
