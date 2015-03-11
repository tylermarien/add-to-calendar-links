'use strict';

var _ = require('lodash');
var querystring = require('querystring');

var normalizeEvent = require('./src/normalizeEvent');
var google = require('./src/google');
var yahoo = require('./src/yahoo');
var outlook = require('./src/outlook');
var icalendar = require('./src/icalendar');

module.exports = {
    google: _.compose(google.url, querystring.stringify, google.params, normalizeEvent),
    outlook: _.compose(outlook.url, querystring.stringify, outlook.params, normalizeEvent),
    yahoo: _.compose(yahoo.url, querystring.stringify, yahoo.params, normalizeEvent),
    icalendar: _.compose(icalendar.url, icalendar.createVEvent, normalizeEvent)
};
