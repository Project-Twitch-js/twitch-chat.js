let version = Number(process.versions.node.split('.')[0])
if(version < 16) throw new Error('Node version "16.18.0" or newer is required')

module.exports = {
	Client: require('./Client/twitch.js'),
	Collection: require('./collection/collection.js')
}
