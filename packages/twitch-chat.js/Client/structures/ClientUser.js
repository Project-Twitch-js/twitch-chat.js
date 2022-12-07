const User = require('./User.js')
const constants = require('../../util/const.js')

module.exports = class ClientUser extends User {
	constructor(twitch, data) {
		super(twitch, data)._data(data)
	}

	join(op = {add: true}, ...c) {
		let channels = typeof c[0] == 'object' ? c[0] : c
		let ar = []

		channels.forEach(channel => {
			channel = channel.replace('#', '')
			if(op.add) this.twitch.options.channels.push(channel)
			ar.push(channel)
		})
		ar = ar.join(',#')
		this.twitch.ws.send(`JOIN #${ar}`)
		
	}
		async block(target_id, options = {}) {
		let source_context = ['chat', 'whisper']
		let reason = ['spam', 'harassment', 'other']
		let l = `target_user_id=${target_id}`;
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
	async unblock(target_id) {
		let l = `target_user_id=${target_id}`;
		await this.twitch.rest.http('DELETE', constants.base + constants.endpoints.users.block+l)
		return true
	}
}