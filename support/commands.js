// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("loginToApplication", (email, password) => {
    cy.request({
        method: "POST",
        url: "http://localhost:3000/api/users/login",
        body: {
            "user": {
                "email": "test123@fake.com",
                "password": "123456"
            }
        }
    }).then(response => {
        expect(response.status).to.equal(200);
        // retrive login token by traversing inside the response body
        Cypress.env('token', response.body.user.token);

    });
});
/**
 * Later you can call this command by name and passing the email and password. 
 * Ex:
 * cy.loginToApplication("user@email.com", "pas123");
 */
