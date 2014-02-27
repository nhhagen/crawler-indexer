/*
 * crawler-indexer
 * https://github.com/nhhagen/crawler-indexer
 *
 * Copyright (c) 2014 Niels Henrik Hagen
 * Licensed under the MIT license.
 */

var Q = require('q');
var _ = require('underscore');

function CrawlerError(message) {
  this.message = message;
  this.name = "CrawlerError";
}

var Crawler = function Crawler(options) {
  this.options = _.extend({
    delayMs: 100
  }, options);
  if(!this.options.seedUrl) {
    throw new CrawlerError('options.url must be set');
  }
};

Crawler.prototype = {
  start: function start() {
    var self = this;
    var run = function run(data) {
      return Q.fcall(function() {
        return self.resolveNextUrl(data);
      })
      .then(function(url) {
        if(url) {
          return Q(url).delay(self.options.delayMs)
          .then(function(url) { return self.downloadData(url); })
          .then(function(data) { return self.processData(data); })
          .then(run);
        }
      });
    };
    this.log('Crawling: ' + this.options.seedUrl);
    return run().then(function() {self.log('Done crawling: ' + self.options.seedUrl);});
  },
  resolveNextUrl: function resolveNextUrl(data) {
    throw new CrawlerError('resolveNextUrl must be overridden');
  },
  downloadData: function downloadData(url) {
    throw new CrawlerError('downloadData must be overridden');
  },
  processData: function processData(data) {
    throw new CrawlerError('processData must be overridden');
  },
  log: function log(message) {
    console.log(new Date() + ': ' + message);
  }
};

Crawler.create = function create(options, overrides) {
  var crawler = new Crawler(options);
  crawler = _.extend(crawler, overrides);
  return crawler;
};

module.exports = Crawler;

