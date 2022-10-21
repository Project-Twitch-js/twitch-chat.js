const Base = require('./Base.js');
const constants = require('../../util/const.js');

module.exports = class Message extends Base {
	constructor(data) {
		super(data)

		this.content = data.message || data.parameters
		data = data.tags || data
		this.emotes = data.emotes
		this.color = data.color
		this.flags = data.badges
		this._data(data)
	}

	_data(data) {
		if('message-id' in data) {
			this.id = data['message-id']
		}
		if('returning-chatter' in data) {
			this.returning_chatter = data['returning-chatter']
		}
		if('room-id' in data) {
			this.room_id = data['room-id']
		}
		if('tmi-sent-ts' in data) {
			this.createdTimestamp = Number(data['tmi-sent-ts'])
		}
		if('thread-id' in data) {
			this.thread_id = data['thread-id']
		}
	}

	async delete() {
		await this.twitch.rest.http('DELETE', constants.base + constants.endpoints.moderations.chat + `broadcaster_id=${this.channel.id}&moderator_id=${process.env.ID}&message_id=${this.id}`)
		return true
	}
}