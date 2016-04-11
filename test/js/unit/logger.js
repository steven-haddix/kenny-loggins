import Log4js from '../../../src/log4js';
import Logger from '../../../src/logger';
import {Level} from '../../../src/level';

describe('logger', function () {
  'use strict';
  var assert = chai.assert;

  it("basics Version String check", function() {
    assert.equal(new Log4js().version, '1.0.0');
  });

  it("get default logger", function() {
    let logger = new Log4js();
    assert.equal(logger.getDefaultLogger().toString(), new Logger('[default]').toString());
    assert.equal(logger.loggers['[default]'].toString(), logger.getDefaultLogger().toString());
  });

  it("get logger", function() {
    assert.isNotNull(new Log4js().getLogger('category'));
    assert.equal(new Log4js().getLogger('category').toString(), new Logger('category').toString());
  });
});
