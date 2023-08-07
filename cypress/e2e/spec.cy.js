// describe("My First Test", () => {
//   it("Visits the Kitchen Sink", () => {
//     cy.visit("https://example.cypress.io");

//     cy.contains("type").click();

//     // Should be on a new URL which
//     // includes '/commands/actions'
//     cy.url().should("include", "/commands/actions");

//     // Get an input, type into it
//     cy.get(".action-email").type("fake@email.com");

//     // Verify that the value has been updated
//     cy.get(".action-email").should("have.value", "fake@email.com");
//   });
// });

describe("Cypress login", () => {
  beforeEach(() => {
    cy.login();
  });
  it("should provide a valid session", () => {
    // Call your custom cypress command

    // Visit a route in order to allow cypress to actually set the cookie
    cy.visit("http://127.0.0.1:3000/snippets");
    // Wait until the intercepted request is ready
    cy.wait("@session");
    // This is where you can now add assertions
    // Example: provide a data-test-id on an element.
    // This can be any selector that "always and only" exists when the user is logged in
    cy.get("[data-test-id='authenticated']")
      .should("exist")
      .then(() => {
        cy.log("Cypress login successful");
      });
  });
});
