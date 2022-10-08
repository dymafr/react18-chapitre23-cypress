describe("my first set of tests", () => {
  it("my first test", () => {
    cy.visit("/");
    cy.contains(/list/);
    cy.contains("h1", /list/);
    cy.findByText(/list/i);
    cy.get("h1");
    cy.get(".container")
      .find("h1")
      .should("be.a", "object")
      .and("have.class", "mb-20")
      .and("have.css", "background-color", "rgb(255, 0, 0)")
      .and("have.attr", "id", "unid");
  });
});
