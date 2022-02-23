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
