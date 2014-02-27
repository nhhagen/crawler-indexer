'use strict';

var Indexer = require('../lib/crawler-indexer').Indexer;

/*
======== A Handy Little Nodeunit Reference ========
https://github.com/caolan/nodeunit

Test methods:
test.expect(numAssertions)
test.done()
Test assertions:
test.ok(value, [message])
test.equal(actual, expected, [message])
test.notEqual(actual, expected, [message])
test.deepEqual(actual, expected, [message])
test.notDeepEqual(actual, expected, [message])
test.strictEqual(actual, expected, [message])
test.notStrictEqual(actual, expected, [message])
test.throws(block, [error], [message])
test.doesNotThrow(block, [error], [message])
test.ifError(value)
*/

exports.crawlerIndexer = {
  setUp: function(done) {
    // setup here
    done();
  },
  'create': function(test) {
    test.expect(1);
    // tests here
    var indexer = Indexer.create({}, {
      enqueueItem: function(data) {
        this.items.push(data);
      },
      hasMoreItems: function() {
        return this.items.length > 0;
      },
      dequeueItem: function() {
        return this.items.pop();
      },
      indexItems: function(items) {
        while(items.length > 0) {
          items.pop();
        }
      }
    });
    test.equal(indexer instanceof Indexer, true);
    test.done();
  }
};
