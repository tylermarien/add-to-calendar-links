'use strict';

var moment = require('moment-timezone');
var _ = require('lodash');
var querystring = require('querystring');
var icalendar = require('icalendar');
var uuid = require('node-uuid');

var GOOGLE_URL = 'http://www.google.com/calendar/event?';
var OUTLOOK_URL = 'http://calendar.live.com/calendar/calendar.aspx?';
var YAHOO_URL = 'http://calendar.yahoo.com/?';

var DATE_FORMAT = 'YYYYMMDD[T]HHmmss[Z]';

function googleUrl(params) {
    return GOOGLE_URL + params;
}

function googleParams(evt) {
    var params = {
        action: 'TEMPLATE',
        dates: evt.start.format(DATE_FORMAT) + '/' + evt.end.format(DATE_FORMAT),
        text: evt.title,
        location: evt.location
    };

    return params;
}

function outlookUrl(params) {
    return OUTLOOK_URL + params;
}

function outlookParams(evt) {
    return {
        rru: 'addevent',
        dtstart: evt.start.format(DATE_FORMAT),
        dtend: evt.end.format(DATE_FORMAT),
        summary: evt.title,
        location: evt.location
    };
}

function yahooUrl(params) {
    return YAHOO_URL + params;
}

function yahooParams(evt) {
    return {
        v: 60,
        st: evt.start.format(DATE_FORMAT),
        title: evt.title,
        in_loc: evt.location,
        dur: moment.utc(evt.end.clone().diff(evt.start)).format('HHmm')
    };
}

function normalizeEvent(evt) {
    evt.start = moment.tz(evt.start, evt.timezone).tz('UTC');
    evt.end = moment.tz(evt.end, evt.timezone).tz('UTC');
    return evt;
}

function dataUrl(data) {
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(data);
}

function createVEvent(evt) {
    var vevent = new icalendar.VEvent(uuid.v1());
    vevent.setSummary(evt.title);
    vevent.setDate(evt.start.toDate(), evt.end.toDate());
    vevent.setLocation(evt.location);

    return vevent;
}

module.exports = {
    google: _.compose(googleUrl, querystring.stringify, googleParams, normalizeEvent),
    outlook: _.compose(outlookUrl, querystring.stringify, outlookParams, normalizeEvent),
    yahoo: _.compose(yahooUrl, querystring.stringify, yahooParams, normalizeEvent),
    ical: _.compose(dataUrl, createVEvent, normalizeEvent)
};
