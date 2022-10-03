const { send_message_channel } = require('../../util/_.js');

module.exports = class Channel {
	constructor(twitch, data) {
		this._data(data)
	}

	_data(data) {
		if('broadcaster_name' in data) {
			this.name = data.broadcaster_name
		}
		if('broadcaster_language' in data) {
			this.language = data.broadcaster_language
		}
		if('game_id' in data) {
			this.last_game_id = data.game_id
		}
		if('game_name' in data) {
			this.last_game_name = data.game_name
		}
		if('title' in data) {
			this.last_title = data.title
		}
		if('delay' in data) {
			this.delay = data.delay
		}
	}

	send(message) {
		if(this.type == 'whisper') return this.user.send(message)
		this.ws.send(`PRIVMSG #${channel.user.display_name} :${message}`)
	}
}