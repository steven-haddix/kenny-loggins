import Log4js from '../../../../src/log4js';
import LoggingEvent from '../../../../src/loggingEvent';
import {Level} from '../../../../src/level';
import BasicLayout from '../../../../src/layouts/basic';

describe('layouts/basic', function () {
  'use strict';
  var assert = chai.assert;

  it("layout interface", function() {
    var logger = new Log4js().getLogger('test');
    var layout = new BasicLayout();
    layout.format(new LoggingEvent('categoryName', Level.DEBUG, 'message', 'exception', logger));
  });

  it("format", function() {
    var logger = new Log4js().getLogger('test');
    var layout = new BasicLayout();
    layout.format(new LoggingEvent('categoryName', Level.DEBUG, 'message', 'exception', logger));
  });
});
