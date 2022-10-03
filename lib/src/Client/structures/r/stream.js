const Stream = require("../Stream.js");
const constants = require('../../../util/const.js');

module.exports = class StreamR {
	constructor(twitch) {
		this.twitch = twitch
		this.streamResolver = Stream
	}

	async search(query, channel) {
		let res = await this.twitch.rest.http.http('GET', constants.base + constants.endpoints.channels.query+query)
		let data = new this.streamResolver(res.data[0], channel)
		return data
	}
}