import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from './hooks/browserContextFixture';
import { expect } from '@playwright/test';
import '../utils/cucumber-timeouts';

const url = 'https://www.service.nsw.gov.au/';
let enteredPlateNumber = '';

Given('I open the Service NSW homepage', async () => {
  await pageFixture.page.goto(url, { waitUntil: 'domcontentloaded' });
});

When('I click the Check Rego link', async () => {
  await pageFixture.page.getByRole('link', { name: 'Check rego' }).first().click();
  await pageFixture.page.waitForLoadState('domcontentloaded');
});

When('I click the Check Online button', async () => {
  await pageFixture.page.getByRole('button', { name: /check online/i }).first().click();
});

When('I enter {string} as the plate number', async (plateNumber: string) => {
  enteredPlateNumber = plateNumber;
  await pageFixture.page.locator('#plateNumberInput-helper').waitFor({ state: 'visible' });
  await pageFixture.page.locator('#plateNumberInput').fill(plateNumber);
});

When('I select the terms and conditions checkbox', async () => {
  await pageFixture.page.locator('input#termsAndConditions').check();
});

When('I click the Check registration button', async () => {
  await pageFixture.page.getByRole('button', { name: /check registration/i }).click();
  await pageFixture.page.waitForLoadState('domcontentloaded');
});

Then('I should see an {string} message', async (errorMessage: string) => {
  const expectedMessage = `No vehicles found for ${enteredPlateNumber}`;
  const error = pageFixture.page.locator('h6').filter({ hasText: errorMessage });
  await error.waitFor({ state: 'visible', timeout: 30000 });
  await expect(error).toHaveText(expectedMessage);
  // await pageFixture.page.waitForTimeout(5000);
  
});
