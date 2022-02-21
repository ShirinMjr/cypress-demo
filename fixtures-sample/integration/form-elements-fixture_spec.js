/// <reference types="cypress" />

describe("Form Element", () => {

    beforeEach(() => {
        cy.visit("https://test.qatechhub.com/form-elements/");
        cy.fixture("form_elements").then(function (data) {
            globalThis.data = data;
        });
    });
    it("Form Element Test", () => {
        cy.get(data.firstName.loc).type(data.firstName.val);
        cy.get(data.lastName.loc).type(data.lastName.val);
        cy.get(data.email.loc).type(data.email.val);
        cy.get(data.phoneNumber.loc).type(data.phoneNumber.val);
        cy.get(data.checkBox.loc).check(data.checkBox.val);
        cy.get(data.select.loc).select(data.select.val);
        cy.contains("button", "Submit").click();

        //Verify landing on the next page(submit form sucessfull)
        cy.get("#wpforms-confirmation-49").should("contain", "You have successfully filled in the form");
    });

});
