'use strict';

var moment = require('moment-timezone');

module.exports = function(evt) {
    evt.start = moment.tz(evt.start, evt.timezone).tz('UTC');
    evt.end = moment.tz(evt.end, evt.timezone).tz('UTC');
    return evt;
};
