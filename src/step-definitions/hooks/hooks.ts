import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import {Browser, chromium} from "@playwright/test";
import { pageFixture } from "./browserContextFixture";

let browser: Browser;

//BeforeAll hook: Runs once before all scenarios
BeforeAll(async () => {
    console.log("\nExecuting test suite...");
})

//AfterAll hook: Runs once after all scenarios
AfterAll(async () => {
    console.log("\nFinished execution of test suite!");
})

// Before hook: Runs before each scenario
Before(async ()=> {
    browser = await chromium.launch({ headless: true });
    pageFixture.context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    pageFixture.page = await pageFixture.context.newPage();
})

// After hook: Runs after each scenario
After(async ()=> {
    if (pageFixture.page) {
        await pageFixture.page.close();
    }
    if (browser) {
        await browser.close();
    }
})