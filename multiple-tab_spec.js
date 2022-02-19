/// <reference types="cypress" />

/**
 * Multiple tab is when a url (href) when it's clicked, it opens up in a new window/tab
 * Element has and href wich is the url for target page and the prperty targe="_blank"
 * There are two ways of handelling opeing source in a new tab:
 * 1- Check if the the property target="_blank" and verify href
 * 2- Check if the the property target="_blank", remove the target="_blank" attribute, and open the href in the same window
 */

describe("Multiple window handle", () => {

    beforeEach(() => {
        cy.visit("https://test.qatechhub.com/window-handling/")
    });

    it("TC#1-Verify href and target attributes", () => {
        //Create ailias eisierto work with the button 
        cy.contains("a", "Click Here").as("button");

        cy.get("@button").should("have.attr", "href").and("equal", "https://qatechhub.com");
        cy.get("@button").should("have.attr", "target").and("equal", "_blank");
    });

    it("TC#2-Navigate to target page by removing attr", () => {
        //Create ailias eisierto work with the button 
        cy.contains("a", "Click Here").as("button");

        //.invoke("removeAttr") removed an attribute from element under test
        cy.get("@button").invoke('removeAttr', "target").click();

    });
});
