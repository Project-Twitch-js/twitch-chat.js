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

	async moderators(options = { user_id: '', first: 50 }) {
		let parameter = ''
		if(options.user_id) parameter = parameter + `&user_id=${options.user_id}`
		if(options.first) parameter = parameter + `&first=${options.first}`
		if(options.after) parameter = parameter + `&after=${options.after}`

		let array = []
		
		const { data } = await this.twitch.rest.http('GET', constants.base+constants.endpoints.moderation.moderators+`broadcaster_id=${this.user.id}`+parameter)
		if(!data[0]) {
			let user = await this.twitch.users.fetch(this.user.login_name)
			array.push(user)
		} else {
			data.forEach(d => {
				setTimeout(async() => {
				let user = await this.twitch.users.fetch(d.user_login)
				array.push(user)
				}, 900)
			})
		}

		return array
	}

	async edit(options) {
		if(!options) super.makeError('[MISSING_PARAMETER]: Parameter "options" is required')
		const data_raw = ''
		if(options.game_id) data_raw = data_raw + `game_id=${options.game_id}&`
		if(options.title) data_raw = data_raw + `title=${options.title}&`
		if(options.broadcaster_language) data_raw = data_raw + `broadcaster_language=${options.broadcaster_language}&`
		if(options.delay) data_raw = data_raw + `delay=${options.delay}`
		const data = {
			headers: {
				'Content-Type': 'application/json'
			},
			data: data_raw
		}

		await this.twitch.rest.http('PATCH', constants.base + constants.endpoints.channels.channel+this.user.id, data)
		return true
	}

	async deleteMessages() {
		await this.twitch.rest.http('DELETE', constants.base + constants.endpoints.moderation.chat + `broadcaster_id=${this.user.id}&moderator_id=${moderator[0].id}`)
		return true
	}
}