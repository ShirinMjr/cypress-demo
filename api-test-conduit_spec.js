<reference types="cypress" />
/**
 ******* Full API TEST *******
 * GET API TEST:
 * To make a GET API request with Cypress, we're going to use
 * .request() method and pass a JSON as the body of our request
 * Receive the response in another object
 * POST API TEST:
 * Login is a POST call ->Also we need to authenticate to create a new record
 * Authenticate-> Get a 'token' from response body
 * Sending another POST call to create a new Record
 * New record -> get the article we posted (slug)
 * PUT API TEST:
 * Having 'slug' from previous test 
 * we can update the record which we created before -> a PUT request
 * 
 */

describe("API Testing of Conduit App", () => {

    it("GET API TEST", () => {

        cy.request({
            method: 'GET',
            url: "http://localhost:3000/api/tags"

        }).then(response => {
            cy.log(JSON.stringify(response)); //print out response body
            expect(response.status).to.equal(200); //first check the status
            expect(response.body.tags).to.contains("cypress");// run some more test in response body
        });
    });

    it("POST API TEST", () => {

        let token;//token to authenticate - to POST we need to first authenticate
        let slug; //to get the response object
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
            token = response.body.user.token
            cy.log(token);
            // create a new record
            cy.request({
                method: "POST",
                url: "http://localhost:3000/api/articles",
                headers: {
                    "Authorization": "Token " + token
                },
                body: {
                    "article": {
                        "title": "Cypress articles from cypress code",
                        "description": "This is regarding Cypress",
                        "body": "Cypress is a test automation tool",
                        "tagList": [
                            "cypress",
                            "test"
                        ]
                    }
                }
            }).then(response => {
                expect(response.status).to.equal(200);
                expect(response.body.article.title).to.equal("Cypress articles from cypress code");
                expect(response.body.article.description).to.equal("This is regarding Cypress");
                expect(response.body.article.body).to.equal("Cypress is a test automation tool");
                //response
                slug = response.body.article.slug;
                cy.log(slug);
                //Sending the PUT resuest to updated the content we just create
                cy.request({
                    method: "PUT",
                    url: "http://localhost:3000/api/articles/" + slug,
                    "article": {
                        "title": "Update! - Cypress articles from cypress code",
                        "description": "Update! - This is regarding Cypress",
                        "body": "Update! - Cypress is a test automation tool",
                        "tagList": [
                            "cypress",
                            "test"
                        ]
                    }
                }).then(response => {
                    expect(response.status).to.equal(200);
                    expect(response.body.article.title).to.equal("Update! - Cypress articles from cypress code");
                    expect(response.body.article.description).to.equal("Update! - This is regarding Cypress");
                    expect(response.body.article.body).to.equal("Update! - Cypress is a test automation tool");
                });
            });
        });
    });
});