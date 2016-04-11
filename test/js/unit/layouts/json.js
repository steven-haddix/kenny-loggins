import Log4js from '../../../../src/log4js';
import LoggingEvent from '../../../../src/loggingEvent';
import {Level} from '../../../../src/level';
import JSONLayout from '../../../../src/layouts/json';

describe('layouts/json', function () {
  'use strict';
  var assert = chai.assert;

  it("simple string message format", function() {
    var logger = new Log4js().getLogger('test');
    var layout = new JSONLayout();
    var testEvent = new LoggingEvent('categoryName', Level.DEBUG, 'sample-text', 'exception', logger);
    var stringOutput = layout.format(testEvent);
    var actual = JSON.parse(stringOutput);
    assert.property(actual, "LoggingEvent", "Should encapsulate logging events");
    assert.propertyVal(actual.LoggingEvent, "message", "sample-text", "message should match");
    assert.propertyVal(actual.LoggingEvent, "level", '10000', "debug level should be");
    assert.propertyVal(actual.LoggingEvent, "exception", "exception", "exception should be in place");
  });

  it("object message format", function() {
    var logger = new Log4js().getLogger('test');
    var layout = new JSONLayout();
    var sampleDate = new Date(1511111111111);
    var sampleDateISO = sampleDate.toISOString().replace(/\.\d{3}Z/, "Z");
    var obj = { message: "some message", collectedCoins: 120000, when: sampleDate, name: "Zeratul" };
    var testEvent = new LoggingEvent('categoryName', Level.DEBUG, obj, 'exception', logger);
    var stringOutput = layout.format(testEvent);
    var actual = JSON.parse(stringOutput);
    assert.property(actual, "LoggingEvent", "Should encapsulate logging events");
    assert.propertyVal(actual.LoggingEvent, "message", "some message", "message should match");
    assert.property(actual.LoggingEvent, "collectedCoins_l", "Should contain collectedCoins property of type Long");
    assert.propertyVal(actual.LoggingEvent, "collectedCoins_l", obj.collectedCoins, "Should be propper count of coins");
    assert.property(actual.LoggingEvent, "name_s", "Should contain name property of type String");
    assert.propertyVal(actual.LoggingEvent, "name_s", obj.name, "Should be propper name");
    assert.property(actual.LoggingEvent, "when_dt", "Should contain when property of type date/time");
    assert.propertyVal(actual.LoggingEvent, "when_dt", sampleDateISO, "Should be propper date");
    assert.propertyVal(actual.LoggingEvent, "level", '10000', "debug level should be");
    assert.propertyVal(actual.LoggingEvent, "exception", "exception", "exception should be in place");
  });
});
