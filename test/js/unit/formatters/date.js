import {DEFAULT_DATE_FORMAT, formatDate} from '../../../../src/dateFormatter';

describe('formatters/date', function () {
  'use strict';
  var assert = chai.assert;

  it("constant", function() {
    assert.equal(DEFAULT_DATE_FORMAT, 'yyyy-MM-ddThh:mm:ssO');
  });

  it("format date year", function() {
    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(formatDate(testDate, 'yyyy'), '2006');
  });

  it("format date month", function() {
    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(formatDate(testDate, 'MM'), '01');
  });

  it("format date day", function() {
    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(formatDate(testDate, 'dd'), '02');
  });

  it("format date hour", function() {
    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(formatDate(testDate, 'hh'), '03');
  });

  it("format date minute", function() {
    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    assert.equal(formatDate(testDate, 'mm'), '04');
  });

  it("format date seconds", function() {
    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(formatDate(testDate, 'ss'), '06');

  });

  it.skip("format date timezone offset", function() {
    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(formatDate(testDate, 'O'), '+0100');
  });

  it.skip("format date default", function() {
    assert.equal(DEFAULT_DATE_FORMAT, 'yyyy-MM-ddThh:mm:ssO');

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(
      formatDate(testDate, DEFAULT_DATE_FORMAT),
      '2006-01-02T03:04:06+0100'
    );
  });

  it("format date", function() {
    assert.equal(DEFAULT_DATE_FORMAT, 'yyyy-MM-ddThh:mm:ssO');

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(formatDate(testDate, 'yyyy-MM-dd hh:mm:ss'), '2006-01-02 03:04:06');
  });
});
