'use strict';

var icalendar = require('icalendar');
var uuid = require('node-uuid');

module.exports = {

    url: function(data) {
      return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(data);
    },

    createVEvent: function(evt) {
      var vevent = new icalendar.VEvent(uuid.v1());
      vevent.setSummary(evt.title);
      vevent.setDate(evt.start.toDate(), evt.end.toDate());
      vevent.setLocation(evt.location);

      return vevent;
    }

};
