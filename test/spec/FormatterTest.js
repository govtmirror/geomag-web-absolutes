/* global define, describe, it */
define([
	'chai',

	'mvc/Model',

	'geomag/Formatter'
], function (
	chai,

	Model,

	Format
) {
	'use strict';

	var expect = chai.expect;

	describe('Formatter Unit Tests', function () {

		describe('decimalToDms()', function () {
			it('parses decimals properly', function () {
				// Edge case
				expect(Format.decimalToDms(0.0)).to.deep.equal([0, 0, 0]);
				expect(Format.decimalToDms(30.0)).to.deep.equal([30, 0, 0]);
				expect(Format.decimalToDms(30.5)).to.deep.equal([30, 30, 0]);
				expect(Format.decimalToDms(0.5)).to.deep.equal([0, 30, 0]);

				// Some tests from real observations
				expect(Format.decimalToDms(120.010)).to.deep.equal([120, 0, 36]);
				expect(Format.decimalToDms(193.2192)).to.deep.equal([193, 13, 9]);
				expect(Format.decimalToDms(259.1139)).to.deep.equal([259, 6, 50]);
			});
		});

		describe('degrees()', function () {
			it('are formatted properly', function () {
				expect(Format.degrees(0.0)).to.equal(
						'<span class="deg">0.00<span class="units">°</span></span>');
				// Rounds down properly
				expect(Format.degrees(30.0123456789)).to.equal(
						'<span class="deg">30.01<span class="units">°</span></span>');
				// Rounds up properly
				expect(Format.degrees(30.5555555555)).to.equal(
						'<span class="deg">30.56<span class="units">°</span></span>');
			});
		});

		describe('degrees with no rounding', function () {
			it('are formatted properly', function () {
				expect(Format.rawDegrees(0.1)).to.equal(
						'<span class="deg">0.1<span class="units">°</span></span>');
				expect(Format.rawDegrees(30.0123456789)).to.equal(
						'<span class="deg">' +
							'30.0123456789<span class="units">°</span>' +
						'</span>');
				expect(Format.rawDegrees(30.5555555555)).to.equal(
						'<span class="deg">' +
							'30.5555555555<span class="units">°</span>' +
						'</span>');
			});
		});

		describe('degreesMinutes()', function () {
			it('are formatted properly', function () {
				expect(Format.degreesAndDegreesMinutes(0)).to.equal(
						'<span class="deg">' +
							'0.00<span class="units">°</span>' +
						'</span>' +
						'<span class="degrees-minutes">' +
							'<span class="deg">' +
								'0<span class="units">°</span>' +
							'</span>' +
							'&nbsp;' +
							'<span class="minutes">' +
								'0.00<span class="units">\'</span>' +
							'</span>' +
						'</span>');
				expect(Format.degreesAndDegreesMinutes(179.95)).to.equal(
						'<span class="deg">' +
							'179.95<span class="units">°</span>' +
						'</span>' +
						'<span class="degrees-minutes">' +
							'<span class="deg">' +
								'179<span class="units">°</span>' +
							'</span>' +
							'&nbsp;' +
							'<span class="minutes">' +
								'57.00<span class="units">\'</span>' +
							'</span>' +
						'</span>');
				// Still works when rounding is required
				expect(Format.degreesAndDegreesMinutes(179.94583)).to.equal(
						'<span class="deg">' +
							'179.95<span class="units">°</span>' +
						'</span>' +
						'<span class="degrees-minutes">' +
							'<span class="deg">' +
								'179<span class="units">°</span>' +
							'</span>' +
							'&nbsp;' +
							'<span class="minutes">' +
								'56.75<span class="units">\'</span>' +
							'</span>' +
						'</span>');
			});
		});

		describe('dmsToDecimal()', function () {
			it('parses DMS properly', function () {
				// Edge case
				expect(Format.dmsToDecimal(0, 0, 0)).to.equal(0.0);
				// All whole numbers
				expect(Format.dmsToDecimal(29, 59, 60)).to.equal(30.0);
				// Decimal degree value
				expect(Format.dmsToDecimal(29.5, 29, 60)).to.equal(30.0);
				// Decimal minute value
				expect(Format.dmsToDecimal(0, 29.5, 30)).to.equal(0.5);
				// Decimal degree and minute value
				expect(Format.dmsToDecimal(29.5, 29.5, 30)).to.equal(30.0);

				// Some tests from real observations
				expect(Format.dmsToDecimal(120, 0, 36)).to.equal(120.010);
				expect(Format.dmsToDecimal(193, 13, 9).toFixed(4))
						.to.equal('' + 193.2192);
				expect(Format.dmsToDecimal(259, 6, 50).toFixed(4))
						.to.equal('' + 259.1139);
			});
		});

		describe('minutes()', function () {
			it('are formatted properly', function () {
				expect(Format.minutes(0.0)).to.equal(
						'<span class="minutes">0.00<span class="units">\'</span></span>');
				// Rounds down properly
				expect(Format.minutes(30.0123456789)).to.equal(
						'<span class="minutes">30.01<span class="units">\'</span></span>');
				// Rounds up properly
				expect(Format.minutes(30.5555555555)).to.equal(
						'<span class="minutes">30.56<span class="units">\'</span></span>');
			});
		});

		describe('nanoteslas()', function () {
			it('are formatted properly', function () {
				expect(Format.nanoteslas(0.0)).to.equal(
						'<span class="nano-teslas">' +
							'0.00<span class="units">nT</span>' +
						'</span>');
				// Rounds down properly
				expect(Format.nanoteslas(30.0123456789)).to.equal(
						'<span class="nano-teslas">' +
							'30.01<span class="units">nT</span>' +
							'</span>');
				// Rounds up properly
				expect(Format.nanoteslas(30.5555555555)).to.equal(
						'<span class="nano-teslas">' +
							'30.56<span class="units">nT</span>' +
						'</span>');
				// A number closer to an actual F value
				expect(Format.nanoteslas(54599.6237843)).to.equal(
						'<span class="nano-teslas">' +
							'54599.62<span class="units">nT</span>' +
						'</span>');
			});
		});

		describe('rawNanoteslas()', function () {
			it('are formatted properly', function () {
				expect(Format.rawNanoteslas(0)).to.equal(
						'<span class="nano-teslas">' +
							'0<span class="units">nT</span>' +
						'</span>');
				expect(Format.rawNanoteslas(30.0123456789)).to.equal(
						'<span class="nano-teslas">' +
							'30.0123456789<span class="units">nT</span>' +
						'</span>');
				expect(Format.rawNanoteslas(30.5555555555)).to.equal(
						'<span class="nano-teslas">' +
							'30.5555555555<span class="units">nT</span>' +
						'</span>');
				expect(Format.rawNanoteslas(54599.6237843)).to.equal(
						'<span class="nano-teslas">' +
							'54599.6237843<span class="units">nT</span>' +
						'</span>');
			});
		});

		describe('parseDate()', function () {
			it('parses Date properly', function () {
				expect(Format.parseDate('2000-01-01')).to.equal(946684800000);
				// add 1 day, should add 24h*60min*60sec*1000 = 86400000
				expect(Format.parseDate('2000-01-02')).to.equal(946771200000);
				// add 1 month, should add 31d*24h*60min*60sec*1000 = 2678400000
				expect(Format.parseDate('2000-02-01')).to.equal(949363200000);
			});
		});

		describe('parseRelativeTime()', function () {
			var today = new Date();

			it('parses start of day properly', function () {
				var startOfDay = Date.UTC(today.getUTCFullYear(),
						today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0);

				// hhmmss
				expect(Format.parseRelativeTime('00:00:00')).to.equal(startOfDay);
				expect(Format.parseRelativeTime('00 00 00')).to.equal(startOfDay);
				expect(Format.parseRelativeTime('000000')).to.equal(startOfDay);

				// hmmss
				expect(Format.parseRelativeTime('0:00:00')).to.equal(startOfDay);
				expect(Format.parseRelativeTime('0 00 00')).to.equal(startOfDay);
				expect(Format.parseRelativeTime('00000')).to.equal(startOfDay);

				// hhmm
				expect(Format.parseRelativeTime('00:00')).to.equal(startOfDay);
				expect(Format.parseRelativeTime('00 00')).to.equal(startOfDay);
				expect(Format.parseRelativeTime('0000')).to.equal(startOfDay);
			});

			it('parses end of day properly', function () {
				var endOfDay = Date.UTC(today.getUTCFullYear(),
						today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 0);

				// hhmmss
				expect(Format.parseRelativeTime('23:59:59')).to.equal(endOfDay);
				expect(Format.parseRelativeTime('23 59 59')).to.equal(endOfDay);
				expect(Format.parseRelativeTime('235959')).to.equal(endOfDay);
			});

			it('parses one minute properly', function () {
				var oneMinute = Date.UTC(today.getUTCFullYear(),
						today.getUTCMonth(), today.getUTCDate(), 0, 1, 0, 0);

				// hhmmss
				expect(Format.parseRelativeTime('00:01:00')).to.equal(oneMinute);
				expect(Format.parseRelativeTime('00 01 00')).to.equal(oneMinute);
				expect(Format.parseRelativeTime('000100')).to.equal(oneMinute);

				// hmmss
				expect(Format.parseRelativeTime('0:01:00')).to.equal(oneMinute);
				expect(Format.parseRelativeTime('0 01 00')).to.equal(oneMinute);
				expect(Format.parseRelativeTime('00100')).to.equal(oneMinute);

				// hhmm
				expect(Format.parseRelativeTime('00:01')).to.equal(oneMinute);
				expect(Format.parseRelativeTime('00 01')).to.equal(oneMinute);
				expect(Format.parseRelativeTime('0001')).to.equal(oneMinute);
			});

			it('parses one hour properly', function () {
				var oneHour = Date.UTC(today.getUTCFullYear(),
						today.getUTCMonth(), today.getUTCDate(), 1, 0, 0, 0);

				// hhmmss
				expect(Format.parseRelativeTime('01:00:00')).to.equal(oneHour);
				expect(Format.parseRelativeTime('01 00 00')).to.equal(oneHour);
				expect(Format.parseRelativeTime('010000')).to.equal(oneHour);

				// hmmss
				expect(Format.parseRelativeTime('1:00:00')).to.equal(oneHour);
				expect(Format.parseRelativeTime('1 00 00')).to.equal(oneHour);
				expect(Format.parseRelativeTime('10000')).to.equal(oneHour);

				// hhmm
				expect(Format.parseRelativeTime('01:00')).to.equal(oneHour);
				expect(Format.parseRelativeTime('01 00')).to.equal(oneHour);
				expect(Format.parseRelativeTime('0100')).to.equal(oneHour);
			});

			it('parses noon properly', function () {
				var noon = Date.UTC(today.getUTCFullYear(),
						today.getUTCMonth(), today.getUTCDate(), 12, 0, 0, 0);

				// hhmmss
				expect(Format.parseRelativeTime('12:00:00')).to.equal(noon);
				expect(Format.parseRelativeTime('12 00 00')).to.equal(noon);
				expect(Format.parseRelativeTime('120000')).to.equal(noon);

				// hhmm
				expect(Format.parseRelativeTime('12:00')).to.equal(noon);
				expect(Format.parseRelativeTime('12 00')).to.equal(noon);
				expect(Format.parseRelativeTime('1200')).to.equal(noon);
			});

			it('parses a mixed offset properly', function () {
				var mixed = Date.UTC(today.getUTCFullYear(),
						today.getUTCMonth(), today.getUTCDate(), 11, 11, 8, 0);

				// hhmmss
				expect(Format.parseRelativeTime('11:11:08')).to.equal(mixed);
				expect(Format.parseRelativeTime('11 11 08')).to.equal(mixed);
				expect(Format.parseRelativeTime('111108')).to.equal(mixed);
			});

		});

		describe('time()', function () {

			it('parses start of day properly', function () {
				expect(Format.time(0)).to.equal('00:00:00');
			});

			it('parses end of day properly', function () {
				expect(Format.time(86399999)).to.equal('23:59:59');
			});

			it('parses one minute properly', function () {
				expect(Format.time(60000)).to.equal('00:01:00');
			});

			it('parses one hour properly', function () {
				expect(Format.time(3600000)).to.equal('01:00:00');
			});

			it('parses noon properly', function () {
				expect(Format.time(43200000)).to.equal('12:00:00');
			});

			it('parses a mixed offset properly', function () {
				expect(Format.time(40268000)).to.equal('11:11:08');
			});

		});

		// These are currently passing but take a long time (~10 sec) to complete.
		// We should re-check this test any time the _dmsToDecimal or _decimalToDms
		// methods are updated
		describe.skip('degree_inversion_check', function () {
			it('gives back original input', function () {
				var deg, min, sec, result;

				for (deg = 0; deg < 360; deg++) {
					for (min = 0; min < 60; min++) {
						for (sec = 0; sec < 60; sec++) {
							result = Format.dmsToDecimal(deg, min, sec);
							expect(Format.decimalToDms(result)).to.deep.equal([deg, min, sec]);
						}
					}
				}
			});
		});
	});
});