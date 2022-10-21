const Stream = require("../Stream.js");
const constants = require('../../../util/const.js');

module.exports = class StreamR {
	constructor(twitch) {
		this.twitch = twitch
		this.streamResolver = Stream
	}

	async search(name) {
		let res = await this.twitch.rest.http('GET', constants.base + constants.endpoints.channels.streams+'user_login='+name)
		let user = await this.twitch.users.fetch(name)
		let data = new this.streamResolver(this.twitch, res.data[0], user)
		return data
	}
}