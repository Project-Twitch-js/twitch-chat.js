const http = require('../http/http.js');
const fetch = require('../http/fetch.js');
const EventEmitter = require('node:events');
const WebSocket = require('./websocket/websocket.js');

const ChannelManager = require('./managers/ChannelManager.js');
const UserManager = require('./managers/UserManager.js');
const { makeError } = require('../util/_.js')

class Client extends EventEmitter {
	constructor(options) {
		super(options)
		this.options = options || {}
		if(typeof this.options !== 'object') throw new TypeError('Provide an "object"')
		if(!process.env.TWITCH_NAME && !this.options.name) throw new Error('Provide login name')
		if(!process.env.CLIENT_ID && !this.options.client_id) throw new Error('Provide the client id')
		if(this.options.channels && typeof options.channels !== 'object' || !process.env.CHANNELS && !options.channels) throw new Error('Provide an array')
		
		this.rest = {}
		this.ping = -1

		this.ws = new WebSocket(this)
		
		this.rest.http = new http(options)

		this.fetch = new fetch(this)

		this.channels = new ChannelManager(this)
		this.users = new UserManager(this)

		return this
	}

	async login(token) {
		if(!process.env.TWITCH_TOKEN && !token) throw new Error('Provide argument Token. Example: <Twitch>.login("token")')
		if(process.env.CLIENT_ID) this.options.client_id = process.env.CLIENT_ID
		if(process.env.CLIENT_ID) token = process.env.TWITCH_TOKEN
		if(process.env.TWITCH_NAME) this.options.name = process.env.TWITCH_NAME
		if(process.env.CHANNELS) {
			this.options.channels = process.env.CHANNELS.replace(/'/g, '"')
			try {
			this.options.channels = JSON.parse(this.options.channels)
			} catch {
				this.options.channels = this.options.channels
			}
		}

		process.env.CLIENT_ID = this.options.client_id
		process.env.TWITCH_TOKEN = token
		await this.ws.connect()
	}

	join(...c) {
		let channels = typeof c[0] == 'object' ? c[0] : c

		if(!this.ws.send) makeError(Error, 'WEBSOCKET', 'You need to run this functions at events or after "<Twitch>.login", because "<Twitch>.ws.send" returned "null"')
		c.forEach(channel => {
			setTimeout(() => {
				this.ws.send(`JOIN #${channel}`)
			}, 900)
		})
	}
}
	
module.exports = Client