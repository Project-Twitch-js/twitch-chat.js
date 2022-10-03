const constants = require('./const.js');
const http = require('../http/http.js');
let h = new http({}).http

module.exports = {
  send_msg: async (msg, to_id) => {
		await h('POST', `${constants.base}${constants.endpoints.users.send_whispers}from_user_id=${process.env.ID}&to_user_id=${to_id}`, {headers: {'Content-Type': 'application/json'}, data: { "message": `${msg}`}})
	},
	msg: (data, u = []) => {
		let msg = {}

		data = data.join(' ')
		let param = data.split('@')
		let info = param[1]?.split(';')
			.forEach(m => {
				let args = m.split('=')
				msg[args[0]] = args[1]
				let us = data.split('!')[1]
				msg.users = u.push(us?.split('@')[0])
			})
		let messages = param[2]?.split(' ')
			messages?.forEach(m => {
				if(m === 'WHISPER') return msg.isWhisper = true
				else false
				
			})
		let message = messages?.join(' ').split(':')[1]
		if(message) msg.isMessage = true
		msg.message = message
		return msg
	},

	json_messages: (data) => {
		let json = {};
	  data.forEach(m => {
			let status  = m.split(' ')[1]
			let command = m.split(' ')[0]
			json.command = command
			if(isNaN(status)) return;
			json[status] = status
			if(Number(status) === 376) json.ok = Number(status)
		})
		return json
	},

	channels_array: (array) => {
		let channels_string = array.join('#,')
		return channels_string
	},
	send_message_channel: (ws, channel, message) => {
		ws.send(`PRIVMSG #${channel} :${message}`)
	}
}