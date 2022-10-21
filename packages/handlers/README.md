# Creating handlers
```js
const { Command, Event } = require('@twitchchatjs/handlers');

Client.commands = new Twitch.Collection();
Client.aliases = new Twitch.Collection();

new Command(Client, path).load()
new Event(Client, path).load()
```
> options: `new Command(Client, path, {subFolder: true})`