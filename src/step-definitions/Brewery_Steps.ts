import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {
  request as playwrightRequest,
  APIRequestContext,
} from "@playwright/test";

let apiContext: APIRequestContext;
let response: any;
let responseBody: any;


Given('I send a GET request to {string}', async (url: string) =>{
  apiContext = await playwrightRequest.newContext();
  response = await apiContext.get(url);
  responseBody = await response.json();
  console.log(responseBody);
});

Then("the response status code should be {int}", async (status: number) => {
  expect(response.status()).toBe(status);
});

Then('I print the brewery details for each record', async () => {
  expect(Array.isArray(responseBody)).toBeTruthy();
  expect(responseBody.length).toBeGreaterThan(0);

  responseBody.forEach((brewery: any, index: number) => {
    console.log(`Brewery ${index + 1}: name=${brewery.name || 'N/A'}, address_1=${brewery.address_1 || 'N/A'}`);
    //testing
  });
});