import { render, screen } from "@testing-library/react";
import {
	ModalContext,
	ModalNode,
	useModalContext,
} from "../modalcontext/modalcontext";
import userEvent from "@testing-library/user-event";

function ModalMock({ obj }: { obj: ModalNode[] }) {
	return (
		<ModalContext>
			<OpenModalMock obj={obj} />
		</ModalContext>
	);
}

function OpenModalMock({ obj }: { obj: ModalNode[] }) {
	const [, setModalState] = useModalContext();
	return (
		<button
			onClick={() => {
				setModalState((prev) => [...prev, ...obj]);
			}}
		>
			Open Modal
		</button>
	);
}

describe("Modal", () => {
	it("Should render a default component", () => {
		render(
			<ModalMock
				obj={[
					{
						title: "TEST",
						node: <div>RENDERED</div>,
					},
				]}
			/>
		);
		expect(screen.queryByText("RENDERED")).not.toBeInTheDocument();
	});
	it("Should open the modal", async () => {
		const html = render(
			<ModalMock
				obj={[
					{
						title: "TEST",
						node: <div>RENDERED</div>,
					},
				]}
			/>
		);
		await userEvent.click(screen.getByText("Open Modal"));
		expect(screen.getByText("RENDERED")).toBeInTheDocument();
	});
	it("Should close the modal", async () => {
		render(
			<ModalMock
				obj={[
					{
						title: "TEST",
						node: <div>RENDERED</div>,
					},
				]}
			/>
		);
		await userEvent.click(screen.getByText("Open Modal"));
		await userEvent.click(screen.getByText("Close"));
		expect(screen.queryByText("RENDERED")).not.toBeInTheDocument();
	});
	it("Should close the modal globally", async () => {
		const html = render(
			<ModalMock
				obj={[
					{
						title: "TEST",
						node: <div>RENDERED</div>,
					},
				]}
			/>
		);
		await userEvent.click(screen.getByText("Open Modal"));
		const modal = html.container.querySelector("#modal");
		expect(modal).toBeInTheDocument();
		await userEvent.click(modal!);
		expect(screen.queryByText("FIRST RENDERED")).not.toBeInTheDocument();
	});
	it("Should show the back button and the second item", async () => {
		render(
			<ModalMock
				obj={[
					{
						title: "FIRST",
						node: <div>FIRST RENDERED</div>,
					},
					{
						title: "SECOND",
						node: <div>SECOND RENDERED</div>,
					},
				]}
			/>
		);
		await userEvent.click(screen.getByText("Open Modal"));
		expect(screen.getByText("SECOND RENDERED")).toBeInTheDocument();
		expect(screen.getByText("Back to FIRST")).toBeInTheDocument();
	});
	it("Should show the back button and the second item", async () => {
		render(
			<ModalMock
				obj={[
					{
						title: "FIRST",
						node: <div>FIRST RENDERED</div>,
					},
					{
						title: "SECOND",
						node: <div>SECOND RENDERED</div>,
					},
				]}
			/>
		);
		await userEvent.click(screen.getByText("Open Modal"));
		await userEvent.click(screen.getByText("Back to FIRST"));
		expect(screen.getByText("FIRST RENDERED")).toBeInTheDocument();
	});
});
