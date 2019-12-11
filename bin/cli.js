#!/usr/bin/env node

/* istanbul ignore if */
if (process.version.match(/v(\d+)\./)[1] < 8) {
  console.error('standard-version: Node v8 or greater is required. `standard-version` did not run.')
} else {
  const pressboard = require('../index')
  pressboard()
}