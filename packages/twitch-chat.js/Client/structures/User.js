const base = require('./Base.js')
const sendWhispers = require('../../util/_.js');
const constants = require('../../util/const.js')

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
			this.allviewerCount = data.view_count
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
			this.email = data.email
		}
	}

	send(message) {
		return sendWhispers.send_msg(message, this.id)
	}

	async block(options = {}) {
		let source_context = ['chat', 'whisper']
		let reason = ['spam', 'harassment', 'other']
		let l = `target_user_id=${this.id}`;
		if(options.source_context) {
			if(!source_context.includes(options.source_context)) super.makeError(`[INAVLID_PARAMETERS_SOURCE_CONTEXT]: The "souce_context" parameter is invalid. Valid options: ${source_context}`)
			l = `&source_context=${options.source_context}` + l
		}
		if(options.reason) {
			if(!reason.includes(options.source_context)) super.makeError(`[INAVLID_PARAMETERS_REASON]: The "reason" parameter is invalid. Valid options: ${reason}`)
			l = `&reason=${options.reason}` + l
		}

		await this.twitch.rest.http('PUT', constants.base + constants.endpoints.users.block+l)
		return true
	}
}

module.exports = User