/*
 * crawler-indexer
 * https://github.com/nhhagen/crawler-indexer
 *
 * Copyright (c) 2014 Niels Henrik Hagen
 * Licensed under the MIT license.
 */

'use strict';

var Crawler = require('./Crawler');
var Indexer = require('./Indexer');
exports.awesome = function() {
  return {
    Crawler: Crawler,
    Indexer: Indexer
  };
};
