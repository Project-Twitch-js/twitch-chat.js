const axios = require('axios');
const constants = require('../util/const.js');
const error = require('./error.js');

module.exports = class HTTP {
	constructor(options) {
		this.options = options || {}
		this.err = error
	}

	async http(method, uri, op = {}) {
		op.headers = {
				'Authorization': 'Bearer ' + process.env.TWITCH_TOKEN,
				'Client-Id': process.env.CLIENT_ID
			}
		let res;
		try {
		res = await axios(uri, {
			method: method,
			headers: op.headers,
			data: op.data,
			op
		})
		} catch (data) {
			return new this.err(data)
		}
		return res.data
	}
}