let version = Number(process.versions.node.split('.')[0])
if(version < 16) throw new Error('Node version "16.7.0" or newer is required')

module.exports = {
	Client: require('./lib/src/Client/twitch.js'),
	CommandHandler: require('./lib/functions/handler/Command.js'),
	EventHandler: require('./lib/functions/handler/Event.js'),
	Collection: require('./lib/src/collection/collection.js')
}