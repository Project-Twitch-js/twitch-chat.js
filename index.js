module.exports = {
	Client: require('./lib/src/Client/twitch.js'),
	CommandHandler: require('./lib/functions/handler/Command.js'),
	EventHandler: require('./lib/functions/handler/Event.js'),
	Collection: require('./lib/src/collection/collection.js')
}