# broken-npm-path

[![npm version](https://img.shields.io/npm/v/broken-npm-path.svg)](https://www.npmjs.com/package/broken-npm-path)
[![Github Actions](https://action-badges.now.sh/shinnn/broken-npm-path)](https://wdp9fww0r9.execute-api.us-west-2.amazonaws.com/production/results/shinnn/broken-npm-path)

A path to the mock file that simulates an incorrectly installed [npm CLI](https://github.com/npm/cli)

```javascript
const childProcess = require('child_process');
const {promisify} = require('util');
const brokenNpmPath = require('broken-npm-path');

const execFile = promisify(childProcess.execFile);

(async () => {
	await execFile('node', [process.env.npm_execpath, '--version']);
	//=> {stdout: '6.9.0\n', stderr: ''}

	process.env.npm_execpath = brokenNpmPath;

	await execFile('node', [process.env.npm_execpath, '--version']);
	// throws an Error: npm CLI is not correctly installed.
})();
```

This module is useful for the situation where a user tries to test any libraries and applications depending on npm CLI, and needs to cover the case when npm CLI is not correctly installed for some reason.

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

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

[ISC License](./LICENSE) © 2018 - 2019 Watanabe Shinnosuke
