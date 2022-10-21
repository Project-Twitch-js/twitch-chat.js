const StreamR = require('../structures/r/stream.js');

module.exports = class Stream {
	constructor(twitch) {
		this.twitch = twitch
		this.stream = new StreamR(twitch)
	}

	async find(name) {
		return await this.stream.search(name)
	}
}