const Base = require('./Base.js')

module.exports = class Message extends Base {
	constructor(data) {
		super(data)

		this.content = data.message || data.parameters
		data = data.tags?data.tags:data
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
}