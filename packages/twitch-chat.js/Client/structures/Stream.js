const Base = require('./Base.js')

module.exports = class Stream extends Base {
	constructor(twitch, data, user) {
		super(twitch)
		if(!data) return;
		this.title = data.title
		this.viewerCount = data.viewer_count
		this.language = data.language
		this.game = {}
		this.game.id = data.game_id
		this.game.name = data.game_name
		this.id = data.id
		this.user = user
		this.type = data.type
		this.startedAt = data.started_at
		this._data(data)
	}

	_data(data) {
		
		let arr = [];
		if('tags_ids' in data) {
			this.tagsIds = data.forEach(ids => arr.push(data.tags_ids))
		}
	}

	async ads(length) {
		if(!length) super.makeError('[MISSING_PARAMETER]: Parameter "length" is required')
		length = length.replace(/s/g, '')
		length = Number(length)
		if(isNaN(length)) super.makeError(`[PARAMETER_NOT_A_NUMBER]: Parameter "length" is ${typeof length} not number`)
		let valid_op = [30, 60, 90, 120, 150, 180]
		if(!valid_op.includes(length)) super.makeError(`[INVALID_PARAMETER_OPTION] Invalid parameter (${length}) options. Valid options: ${valid_op}`)

		let res = await this.twitch.rest.http('POST', constants.base + constants.endpoints.channels.commercial, {data: `broadcaster_id=${this.user.id}&length=${length}`})
		return res.data[0]
	}

	async clip(options = {id: 50}) {
		let p = `${this.user.id}&id=${options.id}`
		
		if(options.game_id) p = p + `&game_id=${p.game_id}`
		if(options.after) p = p + `&after=${options.after}`
		if(options.before) p = p + `&before=${options.before}`
		if(options.ended_at) p = p + `&started_at=${options.ended_at}`
		if(options.first) p = p + `&first=${options.first}`
		if(options.started_at) p = p + `&started_at=${options.started_at}`

		let res = await this.twitch.rest.http('GET', constants.base + constants.endpoints.channels.clips)
		return res.data
	}

	async createClip() {
		let res = await this.twitch.rest.http('POST', constants.base + constants.endpoints.channels.clips + this.user.id)
		return {
			url: res.data[0].edit_url,
			id: res.data[0].id
		}
	}

	thumbnailURL(options = {widht: 1920, height: 1080, format: 'jpg'}) {
		let valid_op = ['jpg', 'png']
		if(!valid_op.includes(options.format)) super.makeError(TypeError, `[INVALID_FORMAT_PARAMETER]: Parameter ${options.format} is invalid. Valid parameters: ${valid_op}`)
		let url = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${this.user.login_name}-${options.width}x${options.height}.jpg`
		return url
	}

	async ban(target_id, options = {}) {
		let target = target_id
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
		let req = await this.twitch.rest.http('POST', `${constants.base}${constants.moderation.bans}broadcaster_id=${this.broadcaster.user.id}&moderator_id=${process.env.ID}`, d)
		req = req.data[0]
		req.data = d.data
		req.type = !options.duration ? 'ban' : 'timeout'
		let author = await this.twitch.users.fetch(this.user.id)
		let target_ = await this.twitch.users.fetch(this.user.id)
		this.twitch.emit('punishment', req, author, target_, this.user)
		return req
	}

	async unban(options = {}) {
		let target = this.id
		await this.twitch.rest.http('DELETE', `${constants.base}${constants.endpoints.moderation.bans}broadcaster_id=${this.broadcaster.user.id}&moderator_id=${process.env.ID}&user_id=${target}`)
		let target_ = await this.twitch.users.fetch(this.id)
		this.twitch.emit('unpunished', target_, this.user)
		return req
	}
}