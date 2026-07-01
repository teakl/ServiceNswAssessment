@serviceNSW
Feature: Brewery API Testing
    @api
    Scenario: Verify random brewery details
        Given I send a GET request to "https://api.openbrewerydb.org/v1/breweries/random?size=2"
        Then the response status code should be 200
        And I print the brewery details for each record