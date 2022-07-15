type TCheckBox = {
	id: string;
	label: string;
	bool: boolean;
	toggle: () => void;
};

export function CheckBox({ id, label, bool, toggle }: TCheckBox) {
	return (
		<>
			<input
				autoComplete="off"
				type="checkbox"
				id={id}
				name={id}
				defaultChecked={bool}
				onChange={toggle}
			/>
			<label htmlFor={id}>{label}</label>
		</>
	);
}
