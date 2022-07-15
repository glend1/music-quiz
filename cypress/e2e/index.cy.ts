import { cy, Cypress, expect, it } from "local-cypress";

describe("empty spec", () => {
	it("passes", () => {
		cy.visit("https://example.cypress.io");
	});
});
