const User = require('./User.js');
const constants = require('../../util/const.js')

module.exports = class UserStream extends User {
	constructor(twitch, data, broadcaster) {
		super(twitch, data)
		Object.defineProperty(this, 'broadcaster', { value: broadcaster })
	}

	async ban(options = {}) {
		let target = this.id
		let d = {
			headers: {
				"Content-Type": 'application/json'
			},
			data: {
				data: {
					user_id: target,
					reason: options.reason || 'Not Provided'
				}
			}
		}
		if(options.duration) d.data.data.duration = options.duration
		let req = await this.twitch.rest.http('POST', `${constants.base}${constants.endpoints.moderation.bans}broadcaster_id=${this.broadcaster.user.id}&moderator_id=${process.env.ID}`, d)
		req = req.data[0]
		req.data = d.data
		req.type = !options.duration ? 'ban' : 'timeout'
		let target_ = await this.twitch.users.fetch(this.id)
		this.twitch.emit('punishment', req, target_, this.broadcaster)
		return req
	}

	async unban(options = {}) {
		let target = this.id
		await this.twitch.rest.http('DELETE', `${constants.base}${constants.endpoints.moderation.bans}broadcaster_id=${this.broadcaster.user.id}&moderator_id=${process.env.ID}&user_id=${target}`)
		let target_ = await this.twitch.users.fetch(this.id)
		this.twitch.emit('unpunishment', target_, this.broadcaster)
	}
}