import{setDefaultTimeout}from"@cucumber/cucumber";

//If too low this will affect playwrights timeouts and cause tests to fail.
setDefaultTimeout(60000);