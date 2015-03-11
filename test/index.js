'use strict';

var assert = require('assert');
var calendar = require('../index');

describe('Calendar', function() {
  var evt;

  beforeEach(function() {
    evt = {
      title: 'Test Event',
      start: '2015-03-10 12:00:00',
      end: '2015-03-10 13:00:00',
      timezone: 'America/Regina',
      location: '123 Main Street, Saskatoon, SK, CA'
    };
  });

  it('creates a google link', function() {
    var expected = 'http://www.google.com/calendar/event';
    expected += '?action=' + encodeURIComponent('TEMPLATE');
    expected += '&dates=' + encodeURIComponent('20150310T180000Z/20150310T190000Z');;
    expected += '&text=' + encodeURIComponent('Test Event');
    expected += '&location=' + encodeURIComponent('123 Main Street, Saskatoon, SK, CA');

    assert.equal(calendar.google(evt), expected);
  });

  it('creates a yahoo link', function() {
    var expected = 'http://calendar.yahoo.com/';
    expected += '?v=' + encodeURIComponent('60');
    expected += '&st=' + encodeURIComponent('20150310T180000Z');;
    expected += '&title=' + encodeURIComponent('Test Event');
    expected += '&in_loc=' + encodeURIComponent('123 Main Street, Saskatoon, SK, CA');
    expected += '&dur=' + encodeURIComponent('0100');

    assert.equal(calendar.yahoo(evt), expected);
  });

  it('creates an outlook.com link', function() {
    var expected = 'http://calendar.live.com/calendar/calendar.aspx';
    expected += '?rru=' + encodeURIComponent('addevent');
    expected += '&dtstart=' + encodeURIComponent('20150310T180000Z');
    expected += '&dtend=' + encodeURIComponent('20150310T190000Z');;
    expected += '&summary=' + encodeURIComponent('Test Event');
    expected += '&location=' + encodeURIComponent('123 Main Street, Saskatoon, SK, CA');

    assert.equal(calendar.outlook(evt), expected);
  });

  it('creates an icalendar link', function() {
    var actual = calendar.icalendar(evt);

    assert(actual.indexOf('data:text/calendar;charset=utf-8') !== -1);
    assert(actual.indexOf(encodeURIComponent('BEGIN:VCALENDAR')) !== -1);
    assert(actual.indexOf(encodeURIComponent('VERSION:2.0')) !== -1);
    assert(actual.indexOf(encodeURIComponent('BEGIN:VEVENT')) !== -1);
    assert(actual.indexOf(encodeURIComponent('SUMMARY:Test Event')) !== -1);
    assert(actual.indexOf(encodeURIComponent('DTSTART:20150310T180000Z')) !== -1);
    assert(actual.indexOf(encodeURIComponent('DTEND:20150310T190000Z')) !== -1);
    assert(actual.indexOf(encodeURIComponent('LOCATION:123 Main Street\\, Saskatoon\\, SK\\, CA')) !== -1);
    assert(actual.indexOf(encodeURIComponent('END:VEVENT')) !== -1);
    assert(actual.indexOf(encodeURIComponent('END:VCALENDAR')) !== -1);
  });

});
