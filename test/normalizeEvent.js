'use strict';

var assert = require('assert');
var _ = require('lodash');
var normalizeEvent = require('../src/normalizeEvent');

describe('normalizeEvent', function() {
  var evt;

  beforeEach(function() {
    evt = normalizeEvent({
      title: 'Test Event',
      start: '2015-03-10 12:00:00',
      end: '2015-03-10 13:00:00',
      timezone: 'America/Regina',
      location: '123 Main Street, Saskatoon, SK, CA'
    });
  });

  it('converts start to object', function() {
    assert(_.isObject(evt.start));
  });

  it('converts start to UTC time', function() {
    assert.equal(evt.start.zoneName(), 'UTC');
  });

  it('converts end to object', function() {
    assert(_.isObject(evt.end));
  });

  it('converts end to UTC time', function() {
    assert.equal(evt.end.zoneName(), 'UTC');
  });

});
