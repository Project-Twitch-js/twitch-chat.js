const User = require('./User.js')

module.exports = class ClientUser extends User {
	constructor(twitch, data) {
		super(twitch, data)._data(data)
	}
}