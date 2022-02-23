export class RestClient {

    sendGetRequest(apiUrl) {
        return cy.request({
            method: 'GET',
            url: apiUrl
        })
    }
    sendPostRequest(apiUrl, requestHeaders, requestPayload) {
        return cy.request({
            method: "POST",
            url: apiUrl,
            headers: requestHeaders,
            body: requestPayload
        })

    }
}
export const RestClient = new RestClient();

/**
 * You can later make the call just by
 * 
 * RestClient.sendGetRequest("https://GetURL...");
 * 
 * RestClient.sendPostRequest("https://GetURL...", 
 * {"Authorization": "Token " + token},
 * {
 *              "article": {
 *                  "title": "Cypress articles from cypress code",
 *                  "description": "This is regarding Cypress",
 *                  "body": "Cypress is a test automation tool",
 *                  "tagList": [
 *                      "cypress",
 *                      "test"
 *                  ]
 *              }
 *       });
 */
