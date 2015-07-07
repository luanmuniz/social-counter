Social Counter
===================
[![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url] [![NPM Version][node-image]][node-url]

[![Node Build][nodei-image]][nodei-url]

Module that give you the numbers of followers and likes you have

## How it works

First initialize the module
```javascript
var socialCounter = require('social-counter'),
	socialCounterPromise;

	socialCounterPromise = socialCounter.init({
		'facebook': {{YourFacebookPageID}},
		'pinterest': {{YourPinterestUsername}},
		'twitter': {{YourTwitterUsername}}
	});
```

After this, the `socialCounterPromise` will return a promise with the return and the numbers you want
```javascript
socialCounterPromise.then(function() {
	var twitterNumber = socialCounter.getTwitter(),
		facebookNumber = socialCounter.getFacebook(),
		pinterestNumber = socialCounter.getPinterest();

	console.log(twitterNumber); // return a integer with the number of followers you have on twitter
	console.log(facebookNumber); // return a integer with the number of likes your page on facebook
	console.log(pinterestNumber); // return a integer with the number of followers you have on pinterest
});
```

### Development

Install Grunt CLI <br>
`npm install -g grunt-cli`

Install the dependences <br>
`npm install`

## Contributing

Please, check the [Contributing](CONTRIBUTING.md) documentation, there're just a few steps.

## Support or Contact

Having trouble? Or new ideas? Post a new issue! We will be glad to help you!

## License

[MIT License](http://luanmuniz.mit-license.org) © Luan Muniz

[travis-url]: https://travis-ci.org/luanmuniz/social-counter
[travis-image]: https://travis-ci.org/luanmuniz/social-counter.png?branch=master
[depstat-url]: https://david-dm.org/luanmuniz/social-counter
[depstat-image]: https://david-dm.org/luanmuniz/social-counter.png
[nodei-image]: https://nodei.co/npm/social-counter.png
[nodei-url]: https://nodei.co/npm/social-counter
[node-image]: https://badge.fury.io/js/social-counter.svg
[node-url]: http://badge.fury.io/js/social-counter
