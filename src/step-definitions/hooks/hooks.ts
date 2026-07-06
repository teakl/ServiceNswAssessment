import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import os from "os"; // Node native module to check system info

let browser: Browser;

// BeforeAll hook: Runs once before all scenarios
BeforeAll(async () => {
    console.log("\nExecuting test suite...");
    
    // Determine the OS at runtime
    const isMac = process.platform === "darwin";

    // Set base cross-platform args
    const launchArgs = [
        '--disable-blink-features=AutomationControlled',
        '--no-sandbox',
        '--disable-infobars'
    ];

    // Append Mac-specific hardware arguments to bypass macOS headless detection
    if (isMac) {
        launchArgs.push('--use-gl=angle', '--use-angle=metal');
    }

    browser = await chromium.launch({ 
        headless: true,
        channel: 'chromium', 
        args: launchArgs
    });
});

// Before hook: Runs before each scenario
Before(async () => {
    const isMac = process.platform === "darwin";

    // Provide authentic User-Agents unique to each operating system
    const userAgent = isMac 
        ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

    pageFixture.context = await browser.newContext({ 
        viewport: { width: 1440, height: 900 },
        userAgent: userAgent
    });

    pageFixture.page = await pageFixture.context.newPage();

    // Secondary client-side runtime layer to remove automation flags
    await pageFixture.page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
});

// After hook: Runs after each scenario
After(async () => {
    if (pageFixture.page) {
        await pageFixture.page.close();
    }
    if (pageFixture.context) {
        await pageFixture.context.close();
    }
});

// AfterAll hook: Runs once after all scenarios
AfterAll(async () => {
    console.log("\nFinished execution of test suite!");
    if (browser) {
        await browser.close();
    }
});
