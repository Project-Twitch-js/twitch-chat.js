const constants = require('../../../util/const.js');
const User = require('../User.js')

module.exports = class UserR {
	constructor(twitch, options) {
		this.options = options
		this.twitch = twitch
	}

	async fetchUser(name) {
		let data = await this.twitch.rest.http.http('GET', constants.base + constants.endpoints.users.login + name)
		let user = new User(this.twitch, data.data[0])
		return user
	}

}