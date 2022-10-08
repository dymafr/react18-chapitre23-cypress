describe("premier test", () => {
  it("should find title", () => {
    cy.visit("/");
    cy.contains("h1", "Todo list");
    cy.findByText(/todo/i);
  });
});
