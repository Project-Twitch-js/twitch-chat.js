const UserR = require('../structures/r/user.js');

module.exports = class UserManager {
	constructor(twitch) {
		this.twitch = twitch
		this.users = new UserR(twitch)
	}

	async fetch(name) {
		name = name?.replace('#', '')
		let user = await this.users.fetchUser(name)
		return user
	}
}