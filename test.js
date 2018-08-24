'use strict';

const {join} = require('path');

const brokenNpmPath = require('.');
const isexe = require('isexe');
const test = require('tape');

test('A path broken-npm-path exposes', async t => {
	try {
		require(brokenNpmPath);
	} catch ({code}) {
		t.equal(
			code,
			'ERR_BROKEN_NPM',
			'should point to a broken JavaScript file.'
		);
	}

	if (process.platform !== 'win32') {
		t.ok(
			await isexe(brokenNpmPath),
			'should point to a path of an executable.'
		);
	}

	t.equal(
		require(join(brokenNpmPath, '..', '..', 'package.json')).name,
		'npm',
		'should point to a path whose grandparent directory contains a fake package.json.'
	);

	t.end();
});
