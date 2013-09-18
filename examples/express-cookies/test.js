require('./express-cookies');

var Browser = require('zombie'),
    visitLinks = require('../testlib/visitLinks'),
    DE = new Browser(),
    EN = new Browser();
    AR = new Browser();

EN.cookies('localhost', '/').set("yourcookiename", "en");
DE.cookies('localhost', '/').set("yourcookiename", "de");
AR.cookies('localhost', '/').set("yourcookiename", "ar");

describe('Using i18n in express 3.x with cookieParser', function () {
  describe('res.__() is able to handle concurrent request correctly', function () {
    describe('serial requests', function () {
      visitLinks('series', 'test', EN, 'Hello', DE, 'Hallo');
    });

    describe('parallel requests', function () {
      visitLinks('parallel', 'test', EN, 'Hello', DE, 'Hallo');
    });

    describe('serial requests AR', function () {
      visitLinks('series', 'test', EN, 'Hello', AR, 'مرحبا');
    });

    describe('parallel requests AR', function () {
      visitLinks('parallel', 'test', EN, 'Hello', AR, 'مرحبا');
    });

  });

  describe('i18n.__() is NOT able to handle concurrent request correctly', function () {
    describe('serial requests', function () {
      visitLinks('series', 'testfail', EN, 'Hello', DE, 'Hello');
    });

    describe('parallel requests', function () {
      visitLinks('parallel', 'testfail', EN, 'Hello', DE, 'Hello');
    });
  });
});
