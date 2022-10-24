const WS = require('ws');
const msg = require('../../util/_.js');
const Message = require('../structures/Message.js');
const Author = require('../structures/Author.js');
const UserStream = require('../structures/UserChannel.js');
const ClientUser = require('../structures/ClientUser.js');
const {parseMessage} = require('../../util/parser.js');

module.exports = class WebSocket {
	constructor(twitch) {
		this.twitch = twitch
		this.ws = null
		this.l = -1
		this.connection = false
		this.msg = msg
	}

	debug(message) {
		return this.twitch.emit('debug', message)
	}

	join_channels() {
		let channels = this.twitch.options.channels
		if(!channels) return;
		this.twitch.user.join({add: false}, channels)
	}

	async handleMessage(data, d) {
		let user;
		let channel;
		let message;
		switch(data?.command.command) {
			case 'CLEARCHAT':
				if(data.tags['ban-duration']) {
					let user = await this.twitch.users.fetch(data.tags['target-user-id'])
					let to = {
						type: 'timeout',
						timeout_duration: data.tags['ban-duration'],
						room_id: data.tags['room-id'],
						target: user,
						timeCreatedTimestamp: data.tags['tmi-sent-ts']
					}
					this.twitch.emit('punishment', to)
				}
				break;
			case 'JOIN':
				setTimeout(async() => {
					user = await this.twitch.users.fetch(data.source.nick)
				channel = await this.twitch.channels.fetch(data.command.channel)
				this.twitch.emit('joined', user, channel)
				}, 900)
				break;
		case 'PART':
				setTimeout(async() => {
					user = await this.twitch.users.fetch(data.source.nick)
					channel = await this.twitch.channels.fetch(data.command.channel)
				this.twitch.emit('left', user, channel)
				}, 900)
				break;
			case 'ROOMSTATE':
				this.twitch.emit('state', {type: 'room', room: data.tags})
				break;
			case 'USERSTATE':
				this.twitch.emit('state', {type: 'user', user: data.tags})
				break;
			
			case "PRIVMSG":
				channel = await this.twitch.channels.fetch(data.command.channel)
				user = await this.twitch.users.fetch(data.source.nick)
				let data_ = await this.twitch.fetch.LOGin(user.login_name)
				message = new Message(data)
			  channel.type = 'live'
				message.channel = channel
				message.channel.stream.user = new UserStream(this.twitch, data_, message.channel)
				message.author = new Author(data.tags, user)
			this.twitch.emit('message', message)
				break;
		}
		let p = this.msg.msg(d)
			if(!p.isWhisper) return;
				channel = await this.twitch.channels.fetch(p['display-name'])
		
				let message_ = new Message(p)
			  channel.type = 'whisper'
				message_.channel = channel
				message_.author = new Author(p, message_.channel.user)
			this.twitch.emit('message', message_)
	}

	messages_ws(msg_) {
		let json = this.msg.json_messages(msg_)
		
		if(json.command === 'PONG') {
			this.twitch.ping = Date.now() - this.l
			this.debug(`Responded with latency: ${this.twitch.ping}ms`)
		}
		if(json.command === 'PING') {
			this.debug('Responded with PING. Sent PONG')
			this.ws.send('PONG')
		}
		json.ok?this.debug(`Status recived: ${json.ok}`):''
		if(json.ok === 376) {
			setInterval(() => {
			this.l = Date.now()
			this.debug('Got 376')
			this.debug('Sending heartbeat (60 seconds)')
			this.ws.send('PING')
			}, 60000)
		}
	}

	async connect() {
		this.l = Date.now()
		this.twitch.ws = new WS('wss://irc-ws.chat.twitch.tv:443/', 'irc')
		this.ws = this.twitch.ws
		
		this.debug('Connecting to the server...')
		this.ws.onmessage = await this._onMessage.bind(this)
		this.ws.onopen = this._onOpen.bind(this)
	}
	
	async _onMessage(e) {
		let data = e.data.trim().split('\r\n')
		let message = e.data.trimEnd().split('\r\n')
		message.forEach(msg => {
			let parsedMessage = parseMessage(msg);
			this.handleMessage(parsedMessage, data)
		})
		let arr = [];
		data.forEach(mg => {
			arr.push(mg)
					})
		this.messages_ws(arr)
			}
		
  async _onOpen() {
		this.debug('Sending PASS')
		this.debug('Sending CAP')
		this.debug('Sending NICK')
		this.ws.send(`CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership`);
		this.ws.send(`PASS oauth:${process.env.CLIENT_TOKEN}`)
		this.ws.send(`NICK ${this.twitch.options.name}`)
		this.debug('-------------------')
		this.debug(' CAP: OK\n PASS: OK\n NICK: OK')
		this.debug('-------------------')
		this.twitch.ping = Date.now() - this.l
		let s = await this.twitch.fetch.LOGin(this.twitch.options.client_name)
		this.twitch.user = new ClientUser(this.twitch, s)
		process.env.ID = this.twitch.user.id
		this.join_channels()
		this.connection = true
		this.twitch.emit('ready', this.twitch)
	}
}