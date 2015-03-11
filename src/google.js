'use strict';

var GOOGLE_URL = 'http://www.google.com/calendar/event?';
var DATE_FORMAT = 'YYYYMMDD[T]HHmmss[Z]';

module.exports = {

  url: function(params) {
      return GOOGLE_URL + params;
  },

  params: function(evt) {
      var params = {
          action: 'TEMPLATE',
          dates: evt.start.format(DATE_FORMAT) + '/' + evt.end.format(DATE_FORMAT),
          text: evt.title,
          location: evt.location
      };

      return params;
  }

};
