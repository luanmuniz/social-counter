'use strict';

var Promise = require('promise'),
	request = Promise.denodeify(require('request')),
	socialHelper;

socialHelper = {

	socialNumbers: {},
	opt: {
		facebook: false,
		pinterest: false,
		twitter: false
	},

	init: function(config) {

		this.opt = config;
		return this.populateObj();

	},

	populateObj: function() {

		var requestArray = [];

		if(this.opt.facebook) {
			requestArray.push( request('http://graph.facebook.com/' + this.opt.facebook) );
		}

		if(this.opt.pinterest) {
			requestArray.push( request('http://www.pinterest.com/' + this.opt.pinterest) );
		}

		if(this.opt.twitter) {
			requestArray.push( request('http://twitter.com/' + this.opt.twitter) );
		}

		if(!requestArray.length) {
			return {
				success: false,
				code: 1,
				message: 'You need to configurate this right'
			};
		}

		return Promise.all(requestArray)
			.then(function(res) {

				var metaData, thisNumber, thisJson;

				res.forEach(function(thisRequest) {

					if(thisRequest.request.uri.host === 'graph.facebook.com') {
						thisJson = JSON.parse(thisRequest.body);
						if( thisJson && thisJson.likes ) {
							classe.socialNumbers.facebook = thisJson.likes;
						}
					}

					if(thisRequest.request.uri.host === 'twitter.com') {
						metaData = thisRequest.body.match(/followers_count\&quot\;\:[0-9]+\,\&quot/);
						if( metaData ) {
							thisNumber = metaData[0].match(/[0-9]+/);
							classe.socialNumbers.twitter = thisNumber[0];
						}
					}

					if(thisRequest.request.uri.host === 'www.pinterest.com') {
						metaData = thisRequest.body.match(/<meta property="pinterestapp:followers" name="pinterestapp:followers" content="[0-9]+" data-app>/);
						if( metaData ) {
							thisNumber = metaData[0].match(/[0-9]+/);
							classe.socialNumbers.pinterest = thisNumber[0];
						}
					}

				});

			});

	},

	returnError: function(code, message) {
		return {
			success: false,
			code: code,
			message: message
		};
	},

	getFacebook: function() {
		if(!this.opt.facebook) {
			return this.returnError(1, 'You didnt pass the facebook username');
		}

		if(!this.socialNumbers.facebook) {
			return this.returnError(1, 'Some error with facebook');
		}

		return this.socialNumbers.facebook;

	},

	getTwitter: function() {
		if(!this.opt.twitter) {
			return this.returnError(1, 'You didnt pass the twitter username');
		}

		if(!this.socialNumbers.twitter) {
			return this.returnError(1, 'Some error with twitter');
		}

		return this.socialNumbers.twitter;

	},

	getPinterest: function() {
		if(!this.opt.pinterest) {
			return this.returnError(1, 'You didnt pass the pinterest username');
		}

		if(!this.socialNumbers.pinterest) {
			return this.returnError(1, 'Some error with pinterest');
		}

		return this.socialNumbers.pinterest;

	}

};

module.exports = Object.create(socialHelper);