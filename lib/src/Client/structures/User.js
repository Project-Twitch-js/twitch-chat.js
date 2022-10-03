const base = require('./Base.js')
const sendWhispers = require('../../util/_.js');

class User extends base {
	constructor(twitch, data) {
		super(twitch);
		this.id = data.id
		this._data(data)
	}

	_data(data) {
		if('login' in data) {
			this.login_name = data.login
		}
		if('display_name' in data) {
			this.display_name = data.display_name
		}
		if('profile_image_url' in data) {
			this.avatar = data.profile_image_url
		}
		if('view_count' in data) {
			this.viewerCount = data.view_count
		}
		if('type' in data) {
			data.type?this.type = data.type:''
		}
		if('offline_image_url' in data) {
			this.offAvatarURL = data.offline_image_url
		}
		if('broadcaster_type' in data) {
			this.broadcasterType = data.broadcaster_type
		}
		if('description' in data) {
			this.description = data.description
		}
		if('email' in data) {
			this.email = data.email || null
		}
	}

	send(message) {
		return sendWhispers.send_msg(message, this.id)
	}
}

module.exports = User