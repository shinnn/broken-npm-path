# broken-npm-path

[![npm version](https://img.shields.io/npm/v/broken-npm-path.svg)](https://www.npmjs.com/package/broken-npm-path)
[![Build Status](https://travis-ci.com/shinnn/broken-npm-path.svg?branch=master)](https://travis-ci.com/shinnn/broken-npm-path)

A path to the mock file that simulates an incorrectly installed [npm CLI](https://github.com/npm/cli)

```javascript
const childProcess = require('child_process');
const {promisify} = require('util');
const brokenNpmPath = require('broken-npm-path');

const execFile = promisify(childProcess.execFile);

(async () => {
	await execFile('node', [process.env.npm_execpath, '--version']);
	//=> {stdout: '6.4.0\n', stderr: ''}

	process.env.npm_execpath = brokenNpmMock.bin;

	await execFile('node', [process.env.npm_execpath, '--version']);
	// throws an Error: npm CLI is not correctly installed.
})();
```

This module is useful for the situation where a user tries to test any libraries and applications depending on npm CLI, and needs to cover the case when npm CLI is not correctly installed for some reason.

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install broken-npm-path
```

## API

```javascript
const brokenNpmPath = require('broken-npm-path');
```

### brokenNpmPath

Type: `string`

A path to the intentionally [broken npm CLI entry point](https://github.com/shinnn/broken-npm-path/blob/master/lib/node_modules/npm/bin/npm-cli.js), which throws an error whenever it's run.

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
