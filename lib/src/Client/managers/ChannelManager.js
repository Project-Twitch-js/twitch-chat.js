const ChannelR = require('../structures/r/channels.js');
const UserR = require('../structures/r/user.js');
const StreamR = require('../structures/r/stream.js');

module.exports = class Channels {
	constructor(twitch) {
		this.twitch = twitch
		this.channel = new ChannelR(twitch)
		this.users = new UserR(twitch)
		this.stream = new StreamR(twitch)
	}

	async fetch(name) {
		name = name?.replace('#', '')
		let user = await this.users.fetchUser(name)
		let channel = await this.channel.fetchChannel(user.id)
		if(!channel) return;
		let stream = await this.stream.search(user.login_name, channel)
		channel.stream = stream
		channel.user = user
		return channel
	}
}