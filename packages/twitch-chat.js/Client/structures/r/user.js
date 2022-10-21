const constants = require('../../../util/const.js');
const User = require('../User.js')

module.exports = class UserR {
	constructor(twitch, options) {
		this.options = options
		this.twitch = twitch
	}

	async fetchUser(target) {
		let param = ''
		let n = target
		target = Number(target)
		if(isNaN(target)) param = 'login='+n
		else param = 'id='+n
		let data = await this.twitch.rest.http('GET', constants.base + constants.endpoints.users.login + param)
		let user = new User(this.twitch, data.data[0])
		return user
	}

}