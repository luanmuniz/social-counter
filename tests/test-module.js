'use strict';

var socialCounter = require('../index.js'),
	thisSocial;

module.exports = {

	setUp: function(callback) {
		thisSocial = socialCounter.init({
			'facebook': 'zimpme',
			'pinterest': 'rafael_braga',
			'twitter': 'lluanmuniz'
		});

		callback();
	},

	getFacebookNumber: function(test) {
		test.expect(1);
		test.equal(typeof(socialCounter.getFacebook), 'function', 'getFacebook Exist');
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
		thisSocial.then(function() {
			var twitterNumber = socialCounter.getTwitter(),
				facebookNumber = socialCounter.getFacebook(),
				pinterestNumber = socialCounter.getPinterest();

			test.expect(3);
			test.ok(twitterNumber, 'Its all ok with twitter');
			test.ok(facebookNumber, 'Its all ok with facebook');
			test.ok(pinterestNumber, 'Its all ok with pinterest');
			test.done();
		});
	}

};