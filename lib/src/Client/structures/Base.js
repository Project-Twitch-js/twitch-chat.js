module.exports = class Base {
	constructor(twitch) {
		    Object.defineProperty(this, 'twitch', { value: twitch });
	}
	_data(data) {
		return data
	}
}