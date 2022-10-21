const axios = require('axios');
const constants = require('../util/const.js');
const error = require('./error.js');

module.exports = class HTTP {
	constructor(options) {
		this.options = options || {}
		this.err = error
	}

	async http(method, uri, op = {headers: {}}) {
		op.headers.Authorization = `Bearer ${process.env.CLIENT_TOKEN}`
		op.headers['Client-Id'] = process.env.CLIENT_ID
		let res;
		try {
		res = await axios(uri, {
			method: method,
			headers: op.headers,
			data: op.data,
			op
		})
		} catch (data) {
			let json = {
				uri: uri,
				method: method,
				data: op.data,
				raw: {
					error: data.response.data.error,
					status: data.response.data.status,
					message: data.response.data.message
				}
			}
			throw new this.err(undefined, json)
		}
		if(res) return res.data
	}
}