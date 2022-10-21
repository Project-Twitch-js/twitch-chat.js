const Channel = require('../Channel.js');
const constants = require('../../../util/const.js');

module.exports = class ChannelR {
	constructor(twitch) {
		this.twitch = twitch
		this.resolverChannel = Channel
	}

	async fetchChannel(id) {
			
		let data = await this.twitch.rest.http('GET', constants.base + constants.endpoints.channels.channel + id)
		let channel = new this.resolverChannel(this.twitch, data.data[0])
		return channel
	}
}