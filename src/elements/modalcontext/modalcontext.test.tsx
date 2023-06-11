import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModalContext, useModalContext } from "./modalcontext";

function ModalMock() {
	return (
		<ModalContext>
			<OpenModalMock />
		</ModalContext>
	);
}

function OpenModalMock() {
	const [, setModalState] = useModalContext();
	return (
		<button
			onClick={() => {
				setModalState((prev) => [
					...prev,
					{
						title: "TEST",
						node: <div>RENDERED</div>,
					},
				]);
			}}
		>
			Open Modal
		</button>
	);
}

describe("GlobalModalContext", () => {
	it("Should render the component", () => {
		render(
			<ModalContext>
				<h1>Hello World</h1>
			</ModalContext>
		);
		expect(screen.getByText("Hello World")).toBeInTheDocument();
	});
});
describe("useModalContext", () => {
	it("Should open the modal", async () => {
		render(<ModalMock />);
		await userEvent.click(screen.getByText("Open Modal"));
		expect(screen.getByText("RENDERED")).toBeInTheDocument();
	});
});
