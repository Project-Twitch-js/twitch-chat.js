const { send_message_channel } = require('../../util/_.js');
const Base = require('./Base.js');
const constants = require('../../util/const.js')

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

	async clip(options = {id: 50}) {
		let p = `${this.user.id}&id=${options.id}`
		
		if(options.game_id) p = p + `&game_id=${p.game_id}`
		if(options.after) p = p + `&after=${options.after}`
		if(options.before) p = p + `&before=${options.before}`
		if(options.ended_at) p = p + `&started_at=${options.ended_at}`
		if(options.first) p = p + `&first=${options.first}`
		if(options.started_at) p = p + `&started_at=${options.started_at}`

		let res = await this.twitch.rest.http.http('GET', constants.base + constants.endpoints.channels.clips)
		return res.data
	}

	async createClip() {
		let res = await this.twitch.rest.http.http('POST', constants.base + constants.endpoints.channels.clips + this.user.id)
		return {
			url: res.data[0].edit_url,
			id: res.data[0].id
		}
	}
}