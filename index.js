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

				var metaData, thisNumber;

				res.forEach(function(thisRequest) {

					if(thisRequest.request.uri.host === 'twitter.com') {
						metaData = thisRequest.body.match(/followers_count\&quot\;\:[0-9]+\,\&quot/);
						if( metaData ) {
							thisNumber = metaData[0].match(/[0-9]+/);
							socialHelper.socialNumbers.twitter = parseInt(thisNumber[0], 10);
						}
					}

					if(thisRequest.request.uri.host === 'www.pinterest.com') {
						metaData = thisRequest.body.match(/<meta property="pinterestapp:followers" name="pinterestapp:followers" content="[0-9]+" data-app>/);
						if( metaData ) {
							thisNumber = metaData[0].match(/[0-9]+/);
							socialHelper.socialNumbers.pinterest = parseInt(thisNumber[0], 10);
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