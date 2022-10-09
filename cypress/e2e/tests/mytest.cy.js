/// <reference types="cypress" />

import todos from "../../fixtures/todos";

const BASE_URL = "https://restapi.fr/api/rtodocy";

describe("my first set of tests", () => {
  before(() => {
    cy.intercept(BASE_URL, { fixture: "todos" }).as("fetchedTodos");
    cy.fixture("todos").as("todos");
    cy.visit("/");
  });

  it("should edit todo", () => {
    cy.intercept("PATCH", `${BASE_URL}/${todos[0]._id}`, {
      ...todos[0],
      edit: true,
    }).as("editTodo");

    cy.contains(todos[0].content)
      .parent()
      .contains(/modifier/i)
      .click();

    cy.wait("@editTodo").its("request.body").should("deep.equal", {
      content: todos[0].content,
      edit: true,
      done: false,
    });

    const type = " et une poire";

    cy.intercept("PATCH", `${BASE_URL}/${todos[0]._id}`, {
      ...todos[0],
      content: todos[0].content + type,
      edit: false,
    }).as("savedTodo");

    cy.findByDisplayValue(todos[0].content)
      .type(type)
      .parent()
      .contains(/sauvegarder/i)
      .click();

    cy.wait("@savedTodo")
      .its("request.body")
      .should("deep.equal", {
        content: todos[0].content + type,
        edit: false,
        done: false,
      });

    cy.contains(todos[0].content + type).should("exist");
  });
});
