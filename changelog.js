#!/usr/bin/env node

'use strict';

/**
 * Just a small command-line wrapper around the conventional-changelog npm module
 * (https://www.npmjs.com/package/conventional-changelog), which also prepends
 * changes to CHANGELOG.md.
 *
 * Runs with default (latest tag...head)
 * $ ./changelog.js
 */

var fs = require('fs');
var cl = require('conventional-changelog');
var changelogStream = fs.createWriteStream('CHANGELOG.md');

var config = {
  preset: 'angular'
};

cl(config, null , {from:'371b9b3'})
  .on('error', function(err) {
      console.error('Failed to generate changelog: ' + err);
    })
  .pipe(changelogStream);
