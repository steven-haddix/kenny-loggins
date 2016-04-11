import Log4js from '../../../../src/log4js';
import Appender from '../../../../src/appender';
import AjaxAppender from '../../../../src/appenders/ajax';
import SimpleLayout from '../../../../src/layouts/simple';

describe('appenders/ajax', function () {
  'use strict';
  var assert = chai.assert;

  it('interface', function() {
    var ajaxLogger = new Log4js().getLogger('ajax');
    var appender = new AjaxAppender(ajaxLogger, '/log4js');
    assert.equal(appender instanceof Appender, true);
    appender.setLayout(new SimpleLayout());
    appender.setLogger(ajaxLogger);
  });


  it('set threshold', function() {
    var ajaxLogger = new Log4js().getLogger('ajax');
    var ajaxAppender = new AjaxAppender(ajaxLogger, '/log4js');
    assert(ajaxAppender.setThreshold(5).getThreshold())
  });
});
