npx eslint# Installing
```bash
npm i twitch.js --save
```

# Getting Starting
```js
const { Client } = require('twitch.js');
const client = new Client({
	name: 'YOUR_BOT_NAME',
	client_id: 'CLIENT_ID',
	channels: ['foo']
})

.on('ready', () => {
	console.log(`Hello ${client.user.login_name}`)
})

.on('message', message => {
	if(message.channel.type !== 'whisper') return;
	if(message.content === '!ping') return message.channel.send(`Websocket: ${client.ping}ms`)
})

client.login('BOT_TOKEN')
```

### Creating a Command and Event Handlers
```js
const { Client, CommandHandler, Collection } = require('twitch.js');

const client = new Client({
	name: 'YOUR_BOT_NAME',
	client_id: 'CLIENT_ID',
	channels: ['foo']
})

client.commands = new Collection()
client.aliases = new Collection()

/* 
Handlers Examples
'./path/to/folder/'
Example:
*/

let commands = new CommandHandler(a, './test/commands/')
let event = new EventHandler(a, './test/events/')
event.load()
commands.load()

client.login('BOT_TOKEN')
```
> Note: You need to create a folder for your commands and events

|   Option (Handler)  |   Argument   |    Description           |   Default   |
| ------------------- | ------------ | ------------------------ | ----------- |
| subFolder           |    Boolean   | Enable/Disable subfolder | false       |


## First Event
```js
module.exports = class Message {
	constructor() {
		return {
			run: this.run
		}
	}
	run(message) {
		const args = message.content
		.trim()
		.slice(1)
		.split(/ +/g);
	const command = args.shift().toLowerCase();    

	let commands = global.client.commands.get(command) || global.client.aliases.get(command)
	let ctx = {
		client: global.client,
		message: message,
		args: args
	}
	if(!commands) return;
	commands.run(ctx)
	}
}
```

## First Command
```js
module.exports = class PingCommand {
	constructor() {
		return {
			name: 'ping',
			alises: ['pong'],
			run: this.run
		}
	}

	run(ctx) {
		return ctx.message.channel.send(`Pong! WebSocket ping: ${ctx.client.ping}ms`)
	}
}
```

# Advenced

> You can create a ".env" file for set `TWITCH_TOKEN`, `CLIENT_ID`, `TWITCH_NAME` and `CHANNELS`

#### Creating an env file

```env
TWITCH_TOKEN=TOKEN_HERE
TWITCH_NAME=TWITCH_NAME_HERE
CLIENT_ID=CLIENT_ID_HERE
CHANNELS=CHANNEL_1,CHANNEL_2
```
> Note: `CHANNELS` can be in `Array`. Example:
```env
CHANNELS=['CHANNEL_1','CHANNEL_2']
```

#### Example main file

```js
const { Client, CommandHandler, Collection } = require('twitch.js');

const client = new Client()

client.login()
```