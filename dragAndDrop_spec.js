/// <reference types="cypress" />

describe("Test - IFrame and drag and drop", () => {

    beforeEach(() => {
        cy.visit("https://jqueryui.com/droppable/");
    });

    it("Drag and drop with IFrame", () => {
        cy.get(".demo-frame").then($frame => {

            const body = $frame.contents().find("body");

            //turning Jquery element to Cypress element
            cy.wrap(body).find("#draggable").as("source");
            cy.wrap(body).find("#droppable").as("target");
        });
        /** 
         * loginc for drag and drop - look for cypress trigger
         * trigger does actions such as mouse moves.
         * {which:1} means target the center of the element
         */

        cy.get("@source").trigger("mousedown", { which: 1 });
        cy.get("@target").trigger("mousemove", { which: 1 }).trigger("mouseup", { force: true });

        //Verify once the element is dropped, text will change to "dropped"
        cy.get("@target").should("contains.text", "Dropped!");
    });
});
