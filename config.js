'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'DBPORT',
    'APPDB',
    'DATABASE_URL',
    'DBUSER',
    'PASS',
  ])
 // .file({ file: path.join(__dirname, 'config.json') })