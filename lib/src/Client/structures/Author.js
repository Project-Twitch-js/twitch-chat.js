const Base = require('./Base.js');

module.exports = class Author extends Base {
	constructor(data, user) {
		super(data)
		this._data(data, user)
	}

	_data(data, user) {
		if('badges' in data) {
			this.badges = data.badges
		}
		if('mod' in data) {
			this.mod = Number(data.mod) == 0?false:true
		}
		if('subscriber' in data) {
			this.subscriber = Number(data.subscriber) == 0?false:true
		}
		if('vip' in data) {
			data.vip = data.vip.split(':')[0]
			this.vip = Number(data.vip) == 0?false:true
		}
		if('turbo' in data) {
			this.turbo = Number(data.turbo) == 0?false:true
		}
		if('badge-info' in data) {
			this.badge_info = data["badge-info"]
		}
		if('color' in data) {
			this.color = data.color
		}
		if('first-msg' in data) {
			this.first_msg = data['first-msg']
		}

		if('user-id' in data) {
			this.id = data['user-id']
		}
		if('display-name' in data) {
			this.display_name = user.display_name
			this.login_name = user.login_name
			this.avatar = user.avatar
			this.offAvatarURL = user.offAvatarURL
			this.viewerCount = user.viewerCount
			this.description = user.description
		}
	}
}