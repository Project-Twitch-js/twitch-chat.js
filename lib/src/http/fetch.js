const constants = require('../util/const.js');
const ClientUser = require('../Client/structures/ClientUser.js');

module.exports = class fetch {
	constructor(twitch) {
		this.twitch = twitch
	}

	async LOGin() {
		let res = await this.twitch.rest.http.http('GET', constants.base+constants.endpoints.users.login+this.twitch.options.name)
		this.data = res
		this.twitch.user = new ClientUser(this.twitch, res.data[0])
		process.env.ID = this.twitch.user.id
	}

	async create_commercial(broadcaster_id, length) {
		let data = {
			data: {
				"broacaster_id": broadcaster_id,
				"length": length
			}
		}
		let res = await this.twitch.res.http.http('POST', constants.base+constants.endpoints.channels.commercial, data)
		return res
	}
}