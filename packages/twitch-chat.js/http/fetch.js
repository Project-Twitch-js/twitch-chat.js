const constants = require('../util/const.js');
const ClientUser = require('../Client/structures/ClientUser.js');

module.exports = class fetch {
	constructor(twitch) {
		this.twitch = twitch
	}

	async LOGin(name) {
		let res = await this.twitch.rest.http('GET', constants.base+constants.endpoints.users.login+`login=${name}`)
		return res.data[0]
	}
}