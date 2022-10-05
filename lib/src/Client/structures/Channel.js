const { send_message_channel } = require('../../util/_.js');
const Base = require('./Base.js')

module.exports = class Channel extends Base {
	constructor(twitch, data) {
		super(twitch)
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
		this.twitch.ws.send(`PRIVMSG #${this.name} :${message}`)
	}

	async ads(length) {
		length = length.replace(/s/g, '');
		length = Number(length)
		if(isNaN(length)) super.makeError(TypeError, 'Type', `Length must be a number, not ${typeof length}`)
		if(length > 180) super.makeError(RangeError, 'Range', `Limit 180s. You put ${length}s`)
		let res = await this.twitch.fetch.create_commercial(this.user.id, length)
		return res
	}
}