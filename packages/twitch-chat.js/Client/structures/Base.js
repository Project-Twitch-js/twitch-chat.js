const { makeError } = require('../../util/_.js');
const error = require('../../http/error.js')

module.exports = class Base {
	constructor(twitch) {
		    Object.defineProperty(this, 'twitch', { value: twitch });
	}
	_data(data) {
		return data
	}

	makeError(req, ...args) {
		throw new error(req, ...args)
	}
}