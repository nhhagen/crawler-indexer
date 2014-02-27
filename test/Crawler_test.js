'use strict';

var Crawler = require('../lib/crawler-indexer').Crawler;

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
    var crawler = Crawler.create({seedUrl: 'http://www.example.com'}, {
      resolveNextUrl: function(data) {
        if(data) {
          return this.options.seedUrl;
        } else {
          return undefined;
        }
      },
      downloadData: function(url) { console.log(url); return {}; },
      processData: function(data) { console.log(data); return {}; },
    });
    test.equal(crawler instanceof Crawler, true);
    test.done();
  }
};
