import Log4js from '../../../../src/log4js';
import { Level } from '../../../../src/level';
import Appender from '../../../../src/appender';
import ConsoleAppender from '../../../../src/appenders/console';
import SimpleLayout from '../../../../src/layouts/simple';

describe('appenders/console', function () {
  'use strict';
  var assert = chai.assert;

  it("interface", function() {
    var logger = new Log4js().getLogger('console');
    var appender = new ConsoleAppender();
    appender.setLayout(new SimpleLayout());
    appender.setLogger(logger);

    appender.setAccessKey('d');
  });

  it("window", function() {
    var logger = new Log4js().getLogger('windowTest');
    logger.setLevel(Level.ALL);
    logger.addAppender(new ConsoleAppender());
  });
});
