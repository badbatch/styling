#!/usr/bin/env node

const yargs = require('yargs');
const watchActiveBuilds = require('../lib/main/watch-active-builds').default; // eslint-disable-line import/no-unresolved, max-len

watchActiveBuilds(yargs.string('id').argv);
