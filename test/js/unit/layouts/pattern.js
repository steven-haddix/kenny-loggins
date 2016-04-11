import Log4js from '../../../../src/log4js';
import LoggingEvent from '../../../../src/loggingEvent';
import {Level} from '../../../../src/level';
import PatternLayout from '../../../../src/layouts/pattern';

describe('layouts/pattern', function () {
  'use strict';
  var assert = chai.assert;

  it('layout interface', function() {
    var logger = new Log4js().getLogger('test');
    var layout = new PatternLayout();
    layout.format(new LoggingEvent('categoryName', Level.DEBUG, 'message', 'exception', logger));
  });

  it('format', function() {
    var logger = new Log4js().getLogger('test');
    var layout = new PatternLayout();
    layout.format(new LoggingEvent('categoryName', Level.DEBUG, 'message', 'exception', logger));
  });
});
