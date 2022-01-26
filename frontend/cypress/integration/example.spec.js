/// <reference types="cypress" />

describe("App", () => {
  it("displays home", () => {
    cy.visit("http://localhost:3000/")
  })
})
