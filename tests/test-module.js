'use strict';

var socialCounter = require('../index.js'),
	thisSocial;

module.exports = {

	setUp: function(callback) {
		this.foo = 'bar';
		callback();
	},

	isNodeUnitWorking: function(test) {
		test.expect(2);
		test.ok(true, 'NodeUnit should be working');
		test.equal(this.foo, 'bar', 'Setup should be working');
		test.done();
	},

	getTwitterNumber: function(test) {
		test.expect(1);
		test.equal(typeof(socialCounter.getTwitter), 'function', 'getTwitter Exist');
		test.done();
	},

	getPinterestNumber: function(test) {
		test.expect(1);
		test.equal(typeof(socialCounter.getPinterest), 'function', 'getPinterest Exist');
		test.done();
	},

	testAllNumbers: function(test) {
		socialCounter.init({
			'pinterest': 'lenineon',
			'twitter': 'lluanmuniz'
		}).then(function() {
			var twitterNumber = socialCounter.getTwitter(),
				pinterestNumber = socialCounter.getPinterest();

			test.expect(2);
			test.equal(typeof(twitterNumber), 'number', 'Its all ok with twitter');
			test.equal(typeof(pinterestNumber), 'number', 'Its all ok with pinterest');
			test.done();
		});
	}

};