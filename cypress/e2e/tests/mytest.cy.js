describe("my first set of tests", () => {
  it("my first test", () => {
    cy.visit("/");
    cy.contains(/list/);
    cy.contains("h1", /list/);
    cy.findByText(/list/i);
    cy.get("h1");
    cy.get(".container").find("h1");
  });
});
