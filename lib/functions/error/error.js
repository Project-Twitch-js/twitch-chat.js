module.exports = (message) => {
	throw new Error(`TwitchError: ` + message)
}