import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GlobalModalContext, useModalContext } from "./modalcontext";

function ModalMock() {
	return (
		<GlobalModalContext modal={true}>
			<OpenModalMock />
		</GlobalModalContext>
	);
}

function OpenModalMock() {
	const context = useModalContext();
	return (
		<button
			onClick={context((data) => {
				return <h3>Rendered</h3>;
			})}
		>
			Open Modal
		</button>
	);
}

describe("GlobalModalContext", () => {
	it("Should render the component", () => {
		const html = render(
			<GlobalModalContext modal={true}>
				<h1>Hello World</h1>
			</GlobalModalContext>
		);
		expect(html.container).toMatchSnapshot();
	});
	it("Should not render the modal", () => {
		const html = render(
			<GlobalModalContext>
				<h1>Hello World</h1>
			</GlobalModalContext>
		);
		expect(html.container).toMatchSnapshot();
	});
});
describe("useModalContext", () => {
	it("Should open the modal", async () => {
		const html = render(<ModalMock />);
		await userEvent.click(screen.getByRole("button"));
		expect(html.container).toMatchSnapshot();
	});
	it("Should close the modal", async () => {
		const html = render(<ModalMock />);
		await userEvent.click(screen.getByRole("button"));
		await userEvent.click(screen.getAllByRole("button")[1]);
		expect(html.container).toMatchSnapshot();
	});
	it("Should close the modal globally", async () => {
		const html = render(<ModalMock />);
		await userEvent.click(screen.getByRole("button"));
		const modal = html.container.querySelector("#modal");
		if (modal) {
			await userEvent.click(modal);
		}
		expect(html.container).toMatchSnapshot();
	});
});
