'use strict';

var moment = require('moment-timezone');

var YAHOO_URL = 'http://calendar.yahoo.com/?';
var DATE_FORMAT = 'YYYYMMDD[T]HHmmss[Z]';

module.exports = {

  url: function(params) {
      return YAHOO_URL + params;
  },

  params: function(evt) {
      return {
          v: 60,
          st: evt.start.format(DATE_FORMAT),
          title: evt.title,
          in_loc: evt.location,
          dur: moment.utc(evt.end.clone().diff(evt.start)).format('HHmm')
      };
  }

};
