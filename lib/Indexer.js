/*
 * crawler-indexer
 * https://github.com/nhhagen/crawler-indexer
 *
 * Copyright (c) 2014 Niels Henrik Hagen
 * Licensed under the MIT license.
 */

var _ = require('underscore');

function IndexerError(message) {
  this.message = message;
  this.name = 'IndexerError';
}

var Indexer = function Indexer(options) {
  this.options = _.extend({
    delayMs: 100,
    batchsize: 100,
    parallelBatches: 2,
  }, options);
};

Indexer.prototype = {
  start: function start() {
    var self = this;
    var parallelBatches = 0;
    var loop = function() {
      var items = [];
      if(parallelBatches < self.options.parallelBatches) {
        var i = 0;
        while(self.hasMoreItems() && i < self.options.batchsize) {
          items.push(self.dequeueItem());
          i++;
        }
        if(items.length > 0) {
          self.indexItems(items)
          .then(function() {
            parallelBatches--;
          });
        }
      }
    };
    this.intervalObject = setInterval(loop, this.options.delayMs);
  },
  stop: function stop() {
    clearInterval(this.intervalObject);
  },
  /*jshint unused:false */
  enqueueItem: function enqueueItem(item) {
    throw new IndexerError('enqueue must be overridden');
  },
  hasMoreItems: function hasMoreItems() {
    throw new IndexerError('hasMoreItems must be overridden');
  },
  dequeueItem: function dequeueItem() {
    throw new IndexerError('dequeueItem must be overridden');
  },
  indexItems: function indexItems(items) {
    throw new IndexerError('indexItems must be overridden');
  },
  /*jshint unused:true */
  log: function log(message) {
    console.log(new Date() + ': ' + message);
  }
};

Indexer.create = function(options, overrides) {
  var indexer = new Indexer(options);
  indexer = _.extend(indexer, overrides);
  return indexer;
};

module.exports = Indexer;

