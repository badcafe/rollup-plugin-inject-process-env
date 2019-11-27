# Test app

> An outstanding app for testing the plugin rollup-plugin-inject-process-env

* Basic tests are run in node
* Advanced tests are run in the browser

The Jest test engine inject `process.env` values.
The main target of the plugin is to bundle browser apps that doesn't defined by its own `process.env`.

This is why we need to test within the browser.
