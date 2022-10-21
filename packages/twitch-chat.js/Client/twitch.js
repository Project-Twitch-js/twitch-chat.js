const http = require('../http/http.js');
const fetch = require('../http/fetch.js');
const EventEmitter = require('node:events');
const WebSocket = require('./websocket/websocket.js');

const ChannelManager = require('./managers/ChannelManager.js');
const UserManager = require('./managers/UserManager.js');
const StreamManager = require('./managers/StreamManager.js');
const { makeError } = require('../util/_.js')

class Client extends EventEmitter {
	constructor(options = {}) {
		super()
		this.options = options
		if(typeof options !== 'object') throw new TypeError('Provide an "object"')
		if(!options.client_name) throw new Error('Provide client name')
		if(!options.client_id && !process.env.CLIENT_ID) throw new Error('Provide the client id')
		if(options.channels && typeof options.channels !== 'object' || !options.channels) throw new Error('Provide an array')
		if(options.client_id) process.env.CLIENT_ID = this.options.client_id
		
		this.ping = -1

		this.ws = new WebSocket(this)
		
		this.rest = new http(options)

		this.fetch = new fetch(this)

		this.channels = new ChannelManager(this)
		this.users = new UserManager(this)
		this.streams = new StreamManager(this)

		return this
	}

	async login(token) {
		if(!token && !process.env.CLIENT_TOKEN) throw new Error('Provide argument Token. Example: <Twitch>.login("token")')

		if(token) process.env.CLIENT_TOKEN = token
		await this.ws.connect()
	}

	get token() {
		return process.env.CLIENT_TOKEN
	}

	get id() {
		return {
			client_id: process.env.CLIENT_ID,
			id: process.env.ID
		}
	}
	
}
	
module.exports = Client