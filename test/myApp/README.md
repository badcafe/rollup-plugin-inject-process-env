# Test app

> An outstanding app for testing the plugin rollup-plugin-inject-process-env

The Jest test engine inject `process.env` values.
The main purpose of the plugin is to bundle browser apps that don't defined by their own `process.env`.

This is why we need to test within the browser.

* Basic tests are run in node
* Advanced tests are run in the browser

There is a second Rollup config for testing with plugins that would already define `process.env` somehow.
