/// <reference types="cypress" />

describe("Form Element", () => {

    beforeEach(() => {
        cy.visit("https://test.qatechhub.com/form-elements/");
    });
    it("Form Element Test", () => {
        cy.get("#wpforms-49-field_1").type("Test");
        cy.get("#wpforms-49-field_1-last").type("User");
        cy.get("input[type='email']").type("testuser@test.com");
        cy.get("input[type='number']").type("9991234040");
        cy.get("input[type='checkbox']").check("Female");
        cy.get("#wpforms-49-field_5").select("Cypress");
        cy.contains("button", "Submit").click();

        //Verify landing on the next page(submit form sucessfull)
        cy.get("#wpforms-confirmation-49").should("contain", "You have successfully filled in the form!");
    });

});
