'use strict';

var OUTLOOK_URL = 'http://calendar.live.com/calendar/calendar.aspx?';
var DATE_FORMAT = 'YYYYMMDD[T]HHmmss[Z]';

module.exports = {

  url: function(params) {
      return OUTLOOK_URL + params;
  },

  params: function(evt) {
      return {
          rru: 'addevent',
          dtstart: evt.start.format(DATE_FORMAT),
          dtend: evt.end.format(DATE_FORMAT),
          summary: evt.title,
          location: evt.location
      };
  }

};
