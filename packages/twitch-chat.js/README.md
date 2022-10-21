# Twitch-chat.js
A simple Twitch API wrapper

# Contents

- [Installing](#installing)
- [Getting Starting](#getting-starting)
  - [Creating command and event handlers](#creating-a-command-and-event-handlers)
    - [First Event](#first-event)
    - [First Command](#first-command)
- [Advenced](#advenced)
  - [Creating an env file](#creating-an-env-file)
    - [Example main file](#example-main-file)
  

# Installing
```bash
npm i twitch-chat.js --save
```
- Node version "16.7.0" or newer is required

# Getting Starting
```js
const { Client } = require('twitch-chat.js');
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
const { Client, Collection } = require('twitch-chat.js');
const { Command, Event } = require('@twitchchatjs/handlers');

const client = new Client({
	client_name: 'YOUR_BOT_NAME',
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

let commands = new Command(a, './test/commands/')
let event = new Event(a, './test/events/')
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
	run(message) {
		if(message.channel.type == 'whisper') return;
		if(!message.content.startsWith('!')) return;
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
		this.name = 'ping',
		this.aliases = ['pong'],
		this.run = this.run
	}

	run(ctx) {
		return ctx.message.channel.send(`Pong! WebSocket ping: ${ctx.client.ping}ms`)
	}
}
```

# Advenced

> You can create a ".env" file for set `CLIENT_TOKEN` & `CLIENT_ID`

#### Creating an env file

```env
CLIENT_TOKEN=TOKEN_HERE
CLIENT_ID=CLIENT_ID_HERE
```

#### Example main file

```js
const { Client } = require('twitch-chat.js');

const client = new Client({
	client_name: 'CLIENT_NAME',
	channels: ['foo']
})

client.login()
```

# Releases
## Packages
### twitch-chat.js@2.0.0
#### Bug Fixed
- `join()` doesn't work correctly and stop the code
#### Added (Methods)
- `Channel.edit()`
- `Channel.moderators()`
- `Channel.deleteMessages()`
- `Client.user.block()`
- `Client.user.unblock()`
- `Message.channel.stream.ads()`
- `Message.channel.stream.ban()`
- `Message.channel.stream.block()`
- `Message.channel.stream.thumbnailURL()`
- `Message.channel.stream.unban()`
- `Message.channel.stream.user.ban()`
- `Message.channel.stream.user.unban()`
- `Message.delete()`
#### Added (Properties)
- `Client.id`
- `Client.token`
- `Message.channel.stream.user`
- `User.email`
#### Added (Events)
- `punishment`
- `unpunishment`
#### Removed (ENV and options)
- `TWITCH_NAME`
- `CHANNELS`
#### Change (ENV and options)
- `TWITCH_TOKEN` to `CLIENT_TOKEN`
- `OptionsClient = { name: 'foo'} to `OptionsClient = { client_name: 'foo'}
#### Change (Methods)
- `Message.channel.createClip() ` to `Message.channel.stream.createClip()`
- `Message.channel.clip()` to `Message.channel.stream.clip()`
- `Client.join()` to `Client.user.join()`