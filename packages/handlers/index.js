let version = Number(process.versions.node.split('.')[0])
if(version < 16) throw new Error('Node version "16.7.0" or newer is required')

module.exports = {
	Command: require('./handler/Command.js'),
	Event: require('./handler/Event.js')
}