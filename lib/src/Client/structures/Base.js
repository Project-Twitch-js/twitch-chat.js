const { makeError } = require('../../util/_.js');

module.exports = class Base {
	constructor(twitch) {
		    Object.defineProperty(this, 'twitch', { value: twitch });
	}
	_data(data) {
		return data
	}

	makeError(type, error, ...args) {
		makeError(type, error, ...args)
	}
}